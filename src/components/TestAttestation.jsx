import React, { useState } from "react"
import {
    SchemaRegistry,
    SchemaEncoder,
    OFFCHAIN_ATTESTATION_VERSION,
    Offchain,
} from "@ethereum-attestation-service/eas-sdk"

import useWalletConnected from "../hooks/useAccount"
import useEasSdk from "../hooks/useEAS"
import SubmitButton from "./common/Button/SubmitButton"

const TestAttestation = () => {
    const { accountDetails } = useWalletConnected()
    const { eas } = useEasSdk()

    const [schemaId, setSchemaId] = useState(null)
    const [attestationUID, setAttestationUID] = useState(null)
    const [offChainAttestation, setOffChainAttestation] = useState(null)

    const handleSubmitSchema = async () => {
        try {
            const schemaRegistryContractAddress = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797"
            const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress).connect(
                accountDetails.signer
            )

            const schema = "bytes32 privatedata"
            const resolverAddress = "0x0000000000000000000000000000000000000000"
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
            const schemaEncoder = new SchemaEncoder("bytes32 hashOfCV, address CVOwner")
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
            ])

            console.log(schemaId)

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

    const handleGetSchema = async () => {
        const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0" // Sepolia 0.26
        const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress)
        schemaRegistry.connect(accountDetails.provider)

        const schemaUID = "0x20351f973fdec1478924c89dfa533d8f872defa108d9c3c6512267d7e7e5dbc2"

        const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID })

        console.log(schemaRecord)
    }

    const handleGetAttestation = async () => {
        try {
            const attestation = await eas.getAttestation(attestationUID)

            console.log(attestation)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOffChainAttestation = async () => {
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("bytes32 hashOfCV ,string text")

            const offchain = await eas.getOffchain()

            const encodedData = schemaEncoder.encodeData([
                {
                    name: "hashOfCV",
                    value: "0x2723f6ef8b739422aaec0dfaca3f0f464ccaa941615111f290fde656700dfa7c",
                    type: "bytes32",
                },
                {
                    name: "text",
                    value: "Ahmed Borwin",
                    type: "string",
                },
            ])

            console.log("encodedData", encodedData)

            const attestation = await offchain.signOffchainAttestation(
                {
                    recipient: "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029",
                    // Unix timestamp of when attestation expires. (0 for no expiration)
                    expirationTime: 0,
                    // Unix timestamp of current time
                    time: Math.floor(Date.now() / 1000),
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    version: 1,
                    nonce: 0,
                    schema: schemaId,
                    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    data: encodedData,
                },
                accountDetails.signer
            )
            // const newAttestationUID = await attestation.wait()
            setOffChainAttestation(attestation)
            console.log("New attestation:", attestation)
        } catch (error) {
            console.error(error)
        }
    }

    const verifyOffChainAttestation = async () => {
        try {
            console.log(offChainAttestation)
            const EAS_CONFIG = {
                address: offChainAttestation.domain.verifyingContract,
                version: offChainAttestation.domain.version,
                chainId: offChainAttestation.domain.chainId,
            }
            console.log("EAS_CONFIG", EAS_CONFIG)
            console.log("OFFCHAIN_ATTESTATION_VERSION", OFFCHAIN_ATTESTATION_VERSION)

            const offchain = new Offchain(EAS_CONFIG, "1.3.0")
            const isValidAttestation = offchain.verifyOffchainAttestationSignature(
                accountDetails.signer,
                offChainAttestation.signature
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
            <SubmitButton onClick={() => handleSubmitSchema()}>Submit Schema</SubmitButton>
            <SubmitButton onClick={() => handleAttestation()}>Make Attestation</SubmitButton>
            <SubmitButton onClick={() => handleGetAttestation()}>Get Attestation</SubmitButton>
            <SubmitButton onClick={() => handleOffChainAttestation()}>
                Make offChain Attestation
            </SubmitButton>
            <SubmitButton onClick={() => verifyOffChainAttestation()}>
                Verify offChain Attestation
            </SubmitButton>
            <SubmitButton onClick={() => handleGetSchema()}>Handle Get Schema</SubmitButton>
        </>
    )
}

export default TestAttestation
