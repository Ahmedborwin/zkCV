// //SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/Semaphore.sol";

error Semaphore__CallerIsNotTheAdmin();

contract ZeroKnowledgeCV is Semaphore {
    /// @dev Gets an jobGroup id and return its editor address.
    mapping(uint256 => address) private jobAd;

    modifier onlyEditor(uint256 entityId, address sender) {
        if (jobAd[entityId] != sender) {
            revert Semaphore__CallerIsNotTheAdmin();
        }

        _;
    }

    //TODO - use counter library from openzeppelin?
    uint256 groupCounter;

    /// @dev Emitted when a whistleblower publish a new leak.
    /// @param entityId: Id of the entity.
    /// @param cvHash: Hash of CV.
    event cvSubmitted(uint256 indexed entityId, uint256 cvHash);
    event newJobAdCreated(uint256 groupId, address admin);

    constructor(ISemaphoreVerifier _verifier) Semaphore(_verifier) {}

    /**
     *
     * @param admin Group Admin
     * @param merkleTreeDepth Duration of Group Proof validity
     */
    function createGroup(address admin, uint256 merkleTreeDepth) external {
        if (merkleTreeDepth < 16 || merkleTreeDepth > 32) {
            revert Semaphore__MerkleTreeDepthIsNotSupported();
        }
        uint256 groupId = groupCounter++;
        _createGroup(groupId, admin);
        jobAd[groupId] = admin;
        groups[groupId].merkleTreeDuration = merkleTreeDepth;

        emit newJobAdCreated(groupId, admin);
    }

    //TODO - only current admin
    // /// @dev See {SemaphoreGroups-_updateGroupAdmin}.
    // function updateGroupAdmin(uint256 groupId, address newAdmin) external override {
    //     _updateGroupAdmin(groupId, newAdmin);
    // }

    //join job Group
    /// @dev See {SemaphoreGroups-_addMember}.
    function addMember(
        uint256 groupId,
        uint256 identityCommitment
    ) external override onlyEditor(groupId, msg.sender) {
        _addMember(groupId, identityCommitment);

        uint256 merkleTreeRoot = getMerkleTreeRoot(groupId);

        groups[groupId].merkleRootCreationDates[merkleTreeRoot] = block.timestamp;
    }
}
