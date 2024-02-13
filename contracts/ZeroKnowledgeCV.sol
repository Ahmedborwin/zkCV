// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {ISemaphore} from "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import {ISemaphoreVerifier} from "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";
import {SemaphoreGroups} from "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";

/// @title Semaphore
/// @dev This contract uses the Semaphore base contracts to provide a complete service
/// to allow admins to create and manage groups and their members to generate Semaphore proofs
/// and verify them. Group admins can add, update or remove group members, and can be
/// an Ethereum account or a smart contract. This contract also assigns each new Merkle tree
/// generated with a new root a duration (or an expiry) within which the proofs generated with that root
/// can be validated.
contract ZeroKnowledgeCV is ISemaphore, SemaphoreGroups {
    ISemaphoreVerifier public verifier;

    /// @dev Gets a group id and returns the group parameters.
    mapping(uint256 => Group) public groups;

    /// @dev Initializes the Semaphore verifier used to verify the user's ZK proofs.
    /// @param _verifier: Semaphore verifier addresse.
    constructor(ISemaphoreVerifier _verifier) {
        verifier = _verifier;
    }

    /// @dev See {SemaphoreGroups-_createGroup}.
    function createGroup(uint256 groupId, address admin) external virtual override {
        _createGroup(groupId, admin);

        groups[groupId].merkleTreeDuration = 1 hours;
    }

    /// @dev See {ISemaphore-createGroup}.
    function createGroup(
        uint256 groupId,
        address admin,
        uint256 merkleTreeDuration
    ) external override {
        _createGroup(groupId, admin);

        groups[groupId].merkleTreeDuration = merkleTreeDuration;
    }

    /// @dev See {SemaphoreGroups-_updateGroupAdmin}.
    function updateGroupAdmin(uint256 groupId, address newAdmin) external override {
        _updateGroupAdmin(groupId, newAdmin);
    }

    /// @dev See {ISemaphore-updateGroupMerkleTreeDuration}.
    function updateGroupMerkleTreeDuration(
        uint256 groupId,
        uint256 newMerkleTreeDuration
    ) external override onlyExistingGroup(groupId) onlyGroupAdmin(groupId) {
        uint256 oldMerkleTreeDuration = groups[groupId].merkleTreeDuration;

        groups[groupId].merkleTreeDuration = newMerkleTreeDuration;

        emit GroupMerkleTreeDurationUpdated(groupId, oldMerkleTreeDuration, newMerkleTreeDuration);
    }

    /// @dev See {SemaphoreGroups-_addMember}.
    function addMember(uint256 groupId, uint256 identityCommitment) external override {
        _addMember(groupId, identityCommitment);

        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        groups[groupId].merkleRootCreationDates[merkleTreeRoot] = block.timestamp;
    }

    /// @dev See {SemaphoreGroups-_addMembers}.
    function addMembers(uint256 groupId, uint256[] calldata identityCommitments) external override {
        _addMembers(groupId, identityCommitments);

        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        groups[groupId].merkleRootCreationDates[merkleTreeRoot] = block.timestamp;
    }

    /// @dev See {SemaphoreGroups-_updateMember}.
    function updateMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external override {
        _updateMember(groupId, identityCommitment, newIdentityCommitment, merkleProofSiblings);

        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        groups[groupId].merkleRootCreationDates[merkleTreeRoot] = block.timestamp;
    }

    /// @dev See {SemaphoreGroups-_removeMember}.
    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external override {
        _removeMember(groupId, identityCommitment, merkleProofSiblings);

        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        groups[groupId].merkleRootCreationDates[merkleTreeRoot] = block.timestamp;
    }

    function validateProof(
        uint256 groupId,
        SemaphoreProof calldata proof
    ) external override onlyExistingGroup(groupId) {
        if (groups[groupId].nullifiers[proof.nullifier]) {
            revert Semaphore__YouAreUsingTheSameNullifierTwice();
        }

        if (!verifyProof(groupId, proof)) {
            revert Semaphore__InvalidProof();
        }

        groups[groupId].nullifiers[proof.nullifier] = true;

        emit ProofValidated(
            groupId,
            proof.merkleTreeDepth,
            proof.merkleTreeRoot,
            proof.nullifier,
            proof.message,
            proof.scope,
            proof.points
        );
    }

    function verifyProof(
        uint256 groupId,
        SemaphoreProof calldata proof
    ) public view override onlyExistingGroup(groupId) returns (bool) {
        if (proof.merkleTreeDepth < 1 || proof.merkleTreeDepth > 12) {
            revert Semaphore__MerkleTreeDepthIsNotSupported();
        }

        uint256 merkleTreeSize = getMerkleTreeSize(groupId);

        if (merkleTreeSize == 0) {
            revert Semaphore__GroupHasNoMembers();
        }

        uint256 currentMerkleTreeRoot = getMerkleTreeRoot(groupId);

        // A proof could have used an old Merkle tree root.
        // https://github.com/semaphore-protocol/semaphore/issues/98
        if (proof.merkleTreeRoot != currentMerkleTreeRoot) {
            uint256 merkleRootCreationDate = groups[groupId].merkleRootCreationDates[
                proof.merkleTreeRoot
            ];
            uint256 merkleTreeDuration = groups[groupId].merkleTreeDuration;

            if (merkleRootCreationDate == 0) {
                revert Semaphore__MerkleTreeRootIsNotPartOfTheGroup();
            }

            if (block.timestamp > merkleRootCreationDate + merkleTreeDuration) {
                revert Semaphore__MerkleTreeRootIsExpired();
            }
        }

        return
            verifier.verifyProof(
                [proof.points[0], proof.points[1]],
                [[proof.points[2], proof.points[3]], [proof.points[4], proof.points[5]]],
                [proof.points[6], proof.points[7]],
                [proof.merkleTreeRoot, proof.nullifier, _hash(proof.message), _hash(proof.scope)],
                proof.merkleTreeDepth
            );
    }

    /// @dev Creates a keccak256 hash of a message compatible with the SNARK scalar modulus.
    /// @param message: Message to be hashed.
    /// @return Message digest.
    function _hash(uint256 message) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(message))) >> 8;
    }
}