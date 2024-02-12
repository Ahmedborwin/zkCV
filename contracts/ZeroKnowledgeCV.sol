// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Semaphore} from "@semaphore-protocol/contracts/Semaphore.sol";
import {ISemaphoreVerifier} from "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";
import "hardhat/console.sol";

/// @title Semaphore
/// @dev This contract uses the Semaphore base contracts to provide a complete service
/// to allow admins to create and manage groups and their members to generate Semaphore proofs
/// and verify them. Group admins can add, update or remove group members, and can be
/// an Ethereum account or a smart contract. This contract also assigns each new Merkle tree
/// generated with a new root a duration (or an expiry) within which the proofs generated with that root
/// can be validated.
contract ZeroKnowledgeCV is Semaphore {
    constructor(ISemaphoreVerifier _verifier) Semaphore(_verifier) {}

    function createGroup(uint256 groupId, address admin) external override {
        console.log("admin", admin);
        _createGroup(groupId, admin);

        groups[groupId].merkleTreeDuration = 156 hours;

        emit GroupCreated(groupId);
    }
}
