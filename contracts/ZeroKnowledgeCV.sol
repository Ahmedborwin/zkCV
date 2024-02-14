// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./interfaces/ISemaphore.sol";

/// @title Semaphore
/// @dev This contract uses the Semaphore base contracts to provide a complete service
/// to allow admins to create and manage groups and their members to generate Semaphore proofs
/// and verify them. Group admins can add, update or remove group members, and can be
/// an Ethereum account or a smart contract. This contract also assigns each new Merkle tree
/// generated with a new root a duration (or an expiry) within which the proofs generated with that root
/// can be validated.
contract ZeroKnowledgeCV {
    ISemaphore public semaphore;

    event CVSubmitted(uint256 cvHash);

    constructor(address semaphoreAddress) {
        semaphore = ISemaphore(semaphoreAddress);
    }

    function createGroup(uint256 _groupId) external {
        //   groupId = _groupId;
        semaphore.createGroup(_groupId, 20, address(this));
    }

    function joinGroup(uint256 _groupId, uint256 identityCommitment) external {
        semaphore.addMember(_groupId, identityCommitment);
    }

    function submitCV(
        uint256 groupId,
        uint256 cvHash,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        uint256 externalNullifier
    ) external {
        semaphore.verifyProof(
            groupId,
            merkleTreeRoot,
            cvHash,
            nullifierHash,
            externalNullifier,
            proof
        );

        emit CVSubmitted(cvHash);
    }
}
