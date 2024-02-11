//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./Interface/IzkCV.sol";
import "./Interface/ISemaphoreVerifier.sol";
import "./base/SemaphoreGroups.sol";
import "hardhat/console.sol";

//------------------------------------------------------------------------
//NOTES TO CONSIDER
//Semaphore.sol does not check if a member with a
//specific identity commitment already exists in a group. This check must be done off-chain.
//------------------------------------------------------------------------

/// @title Semaphore whistleblowing contract.
/// @notice It allows users to leak information anonymously .
/// @dev The following code allows you to create groups for whistleblowers (e.g. non-profit
/// organization, newspaper) and allow them to leak anonymously.
/// Leaks can be IPFS hashes, permanent links or other kinds of references.
contract zkCV is IzkCV, SemaphoreGroups {
    ISemaphoreVerifier public verifier;

    /// @dev Gets an entity id and return its editor address.
    mapping(uint256 => address) private groups;
    mapping(uint256 => uint256[]) private cvListByGroupId;

    /// @dev Checks if the editor is the transaction sender.
    /// @param groupId: Id of the entity.
    modifier onlyAdmin(uint256 groupId) {
        if (groups[groupId] != msg.sender) {
            revert Semaphore__CallerIsNotTheAdmin();
        }

        _;
    }

    /// @dev Initializes the Semaphore verifier used to verify the user's ZK proofs.
    /// @param _verifier: Semaphore verifier address.
    constructor(ISemaphoreVerifier _verifier) {
        verifier = _verifier;
    }

    /// @dev See {iZKCV-createEntity}.
    function createEntity(uint256 groupId, address admin, uint256 merkleTreeDepth) public override {
        if (merkleTreeDepth < 16 || merkleTreeDepth > 32) {
            revert Semaphore__MerkleTreeDepthIsNotSupported();
        }

        _createGroup(groupId, merkleTreeDepth);

        groups[groupId] = admin;

        emit EntityCreated(groupId, admin);
    }

    /// @dev See {IzkCV-addApplicant}.
    function addApplicant(
        uint256 groupId,
        uint256 identityCommitment
    ) public override onlyAdmin(groupId) {
        _addMember(groupId, identityCommitment);
    }

    /// @dev See {IzkCV-removeApplicant}.
    function removeApplicant(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) public override onlyAdmin(groupId) {
        _removeMember(groupId, identityCommitment, proofSiblings, proofPathIndices);
    }

    /// @dev See {IzkCV-submitApplication}.
    function submitApplication(
        uint256 cvHash, //hash needs to be uint256 for verifier contract? Why and how can we turn ipfs hash to unit256??
        uint256 nullifierHash,
        uint256 groupId,
        uint256[8] calldata proof
    ) public override {
        uint256 merkleTreeDepth = getMerkleTreeDepth(groupId);
        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        verifier.verifyProof(
            merkleTreeRoot,
            nullifierHash,
            cvHash,
            groupId,
            proof,
            merkleTreeDepth
        );

        cvListByGroupId[groupId].push(cvHash);

        emit ApplicationSubmitted(groupId, cvHash);
    }

    //Getter functions

    function _getMerkleTreeRoot(uint256 groupId) public view returns (uint256) {
        return getMerkleTreeRoot(groupId);
    }

    function _getMerkleTreeDepth(uint256 groupId) public view returns (uint256) {
        return getMerkleTreeDepth(groupId);
    }

    function getCVListByAd(uint256 _groupId) external view returns (uint256[] memory) {
        return cvListByGroupId[_groupId];
    }

    //Get number of applicant for Job Ad
    function getNumberOfMerkleTreeLeaves(uint256 groupId) public view override returns (uint256) {
        return merkleTrees[groupId].numberOfLeaves;
    }
}
