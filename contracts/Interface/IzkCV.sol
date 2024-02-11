//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/// @title zero knowledge cv contract interface.
interface IzkCV {
    error Semaphore__CallerIsNotTheAdmin();
    error Semaphore__MerkleTreeDepthIsNotSupported();

    struct Verifier {
        address contractAddress;
        uint256 merkleTreeDepth;
    }

    /// @dev Emitted when a new entity is created.
    /// @param groupId: Id of the entity.
    /// @param Admin: Admin of the entity.
    event EntityCreated(uint256 groupId, address indexed Admin);

    /// @dev Emitted when a job application is submitted.
    /// @param groupId: Id of the entity.
    /// @param cvHash: IPHS Hash of CV.
    event ApplicationSubmitted(uint256 indexed groupId, uint256 cvHash);

    /// @dev Creates an entity and the associated Merkle tree/group.
    /// @param groupId: Id of the entity.
    /// @param Admin: Admin of the entity.
    /// @param merkleTreeDepth: Depth of the tree.
    function createEntity(uint256 groupId, address Admin, uint256 merkleTreeDepth) external;

    /// @dev Adds a whistleblower to an entity.
    /// @param groupId: Id of the entity.
    /// @param identityCommitment: Identity commitment of the group member.
    function addApplicant(uint256 groupId, uint256 identityCommitment) external;

    /// @dev Removes a whistleblower from an entity.
    /// @param groupId: Id of the entity.
    /// @param identityCommitment: Identity commitment of the group member.
    /// @param proofSiblings: Array of the sibling nodes of the proof of membership.
    /// @param proofPathIndices: Path of the proof of membership.
    function removeApplicant(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) external;

    /// @dev Allows job seeker to apply with an anonymous cv
    /// @param cvHash: IPFS hash of CV.
    /// @param nullifierHash: Nullifier hash.
    /// @param groupId: Id of the entity.
    /// @param proof: Private zk-proof parameters.
    function submitApplication(
        uint256 cvHash,
        uint256 nullifierHash,
        uint256 groupId,
        uint256[8] calldata proof
    ) external;
}
