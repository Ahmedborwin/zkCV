import React from "react"
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk"
import { ethers } from "ethers"

import useWalletConnected from "../hooks/useAccount"
import { WagmiConfig } from "wagmi"

const TestAttestation = () => {
    const { accountDetails, chain } = useWalletConnected()

    console.log("signer", accountDetails.signer)
    console.log("address", accountDetails.address)
    console.log("provider", accountDetails.provider)
    const handleAttestation = async () => {
        const schemaRegistryContractAddress = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797"
        const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress)

        schemaRegistry.connect(accountDetails.signer)

        const schema = "uint256 eventId, uint8 voteIndex"
        const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"
        const revocable = true

        const transaction = await schemaRegistry.register({
            schema,
            resolverAddress,
            revocable,
        })

        // Optional: Wait for transaction to be validated
        await transaction.wait()
    }
    return (
        <>
            <div>TestAttestation</div>
            <p>What do we need to test here?</p>
            <button onClick={() => handleAttestation()}></button>
        </>
    )
}

export default TestAttestation
