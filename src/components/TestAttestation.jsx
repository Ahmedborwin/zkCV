import React, { useState } from "react"
import {
    SchemaRegistry,
    SchemaEncoder,
    OFFCHAIN_ATTESTATION_VERSION,
    Offchain,
    PartialTypedDataConfig,
} from "@ethereum-attestation-service/eas-sdk"

import useWalletConnected from "../hooks/useAccount"
import useEasSdk from "../hooks/useEAS"

const TestAttestation = () => {
    const { accountDetails, chain } = useWalletConnected()
    const { eas } = useEasSdk()

    const [schemaId, setSchemaId] = useState(null)
    const [attestationUID, setAttestationUID] = useState(null)
    const [offChainAttestation, setOffChainAttestation] = useState(null)

    console.log("signer", accountDetails.signer)
    console.log("address", accountDetails.address)
    console.log("provider", accountDetails.provider)

    const handleSubmitSchema = async () => {
        try {
            const schemaRegistryContractAddress = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797"
            const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress).connect(
                accountDetails.signer
            )

            const schema = "bytes32 hashOfCV, address CVOwner, bytes semaphoreIdentity"
            const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"
            const revocable = true

            const transaction = await schemaRegistry.register({
                schema,
                revocable,
            })

            // Optional: Wait for transaction to be validated
            const SchemaUID = await transaction.wait()
            console.log("SchemaUID", SchemaUID)
            setSchemaId(SchemaUID)
        } catch (error) {
            console.error(error)
        }
    }

    const handleAttestation = async () => {
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder(
                "bytes32 hashOfCV, address CVOwner, bytes semaphoreIdentity"
            )
            const encodedData = schemaEncoder.encodeData([
                {
                    name: "hashOfCV",
                    value: "0x2723f6ef8b739422aaec0dfaca3f0f464ccaa941615111f290fde656700dfa7c",
                    type: "bytes32",
                },
                {
                    name: "CVOwner",
                    value: "0x6075F7cBD3026783e45312Bfb689ACC5ADcD8649",
                    type: "address",
                },
                {
                    name: "semaphoreIdentity",
                    value: "0x6075F7cBD3026783e45312Bfb689ACC5ADcD8649",
                    type: "bytes",
                },
            ])

            const tx = await eas.attest({
                schema: schemaId,
                data: {
                    recipient: "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029",
                    expirationTime: 0,
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    data: encodedData,
                },
            })

            const newAttestationUID = await tx.wait()

            setAttestationUID(newAttestationUID)

            console.log("New attestation UID:", newAttestationUID)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOffChainAttestation = async () => {
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder(
                "bytes32 hashOfCV, address CVOwner, bytes semaphoreIdentity"
            )

            const offchain = await eas.getOffchain()

            const encodedData = schemaEncoder.encodeData([
                {
                    name: "hashOfCV",
                    value: "0x2723f6ef8b739422aaec0dfaca3f0f464ccaa941615111f290fde656700dfa7c",
                    type: "bytes32",
                },
                {
                    name: "CVOwner",
                    value: "0x6075F7cBD3026783e45312Bfb689ACC5ADcD8649",
                    type: "address",
                },
                {
                    name: "semaphoreIdentity",
                    value: "0x6075F7cBD3026783e45312Bfb689ACC5ADcD8649",
                    type: "bytes",
                },
            ])

            console.log("encodedData", encodedData)

            const attestation = await offchain.signOffchainAttestation(
                {
                    recipient: "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029",
                    // Unix timestamp of when attestation expires. (0 for no expiration)
                    expirationTime: 0,
                    // Unix timestamp of current time
                    time: 1671219636,
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    version: 1,
                    nonce: 0,
                    schema: schemaId,
                    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    data: encodedData,
                },
                accountDetails.signer
            )

            const newAttestationUID = await tx.wait()

            setOffChainAttestation(attestation)

            console.log("New attestation UID:", newAttestationUID)
        } catch (error) {
            console.error(error)
        }
    }

    const handleGetAttestation = async () => {
        try {
            const attestation = await eas.getAttestation(attestationUID)

            console.log(attestation)
        } catch (error) {
            console.error(error)
        }
    }

    const verifyOffChainAttestation = async () => {
        try {
            const EAS_CONFIG = {
                address: offChainAttestation.sig.domain.verifyingContract,
                version: offChainAttestation.sig.domain.version,
                chainId: offChainAttestation.sig.domain.chainId,
            }
            const offchain = new Offchain(EAS_CONFIG, OFFCHAIN_ATTESTATION_VERSION)
            const isValidAttestation = offchain.verifyOffchainAttestationSignature(
                offChainAttestation.signer,
                offChainAttestation.sig
            )
            console.log("isValidAttestation", isValidAttestation)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div>TestAttestation</div>
            <p>What do we need to test here?</p>
            <button className="text-lg p-5" onClick={() => handleSubmitSchema()}>
                Submit Schema
            </button>
            <button className="text-lg p-5" onClick={() => handleAttestation()}>
                Make Attestation
            </button>
            <button className="text-lg p-5" onClick={() => handleGetAttestation()}>
                Get Attestation
            </button>
            <button className="text-lg p-5" onClick={() => handleOffChainAttestation()}>
                Make offChain Attestation
            </button>
            <button className="text-lg p-5" onClick={() => verifyOffChainAttestation()}>
                Verify offChain Attestation
            </button>
        </>
    )
}

export default TestAttestation