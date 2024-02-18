import { useState } from "react"

// EAS
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import useEasSdk from "./useEAS"
import schemaList from "../config/EASSchema.json"
import useAccount from "./useAccount"

const RECIPIENT = "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029"

//call this when submitting CV - pass hash of CV value and semaphore ID

const useAttestation = () => {
    const [attestation, setAttestation] = useState(null)
    const [messages, setMessages] = useState(null)

    const { eas } = useEasSdk()

    const { chain } = useAccount()

    const schema = schemaList[chain.id]

    const attestToSchema = async (cvHash, Id, address, time) => {
        const CVData = [
            {
                name: "hashCV",
                value: cvHash,
                type: "uint256",
            },
            {
                name: "SempahoreId",
                value: Id,
                type: "string",
            },
            {
                name: "userAddress",
                value: address,
                type: "string",
            },
            { name: "timeAttested", value: Date.now(), type: "uint256" },
        ]
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder(
                "uint256 hashCV, string SempahoreId ,string userAddress,uint256 timeAttested"
            )
            const encodedData = schemaEncoder.encodeData([...CVData])
            const transaction = await eas.attest({
                schema: schema,
                data: {
                    recipient: RECIPIENT,
                    expirationTime: 0,
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    data: encodedData,
                },
            })

            const newAttestationUID = await transaction.wait()
            //TODO - MAKE CLEAR TO CLIENT THEY NEED TO SAVE ATTESTATION
            alert("SAVE THIS: ", newAttestationUID)
            console.log(`New attestation UID: ${newAttestationUID}`)
        } catch (messages) {
            console.log(messages)
            setMessages(`Error while creating attestation: ${messages}`)
        }
    }

    const fetchAttestation = async (attestationUID) => {
        try {
            const attestationData = await eas.getAttestation(attestationUID)
            console.log(`Fetched attestation: ${attestationData[9]}`)
            setAttestation(attestationData)
            return attestationData
        } catch (messages) {
            setMessages(`Error while fetching attestation: ${messages}`)
        }
    }

    return {
        attestation,
        attestToSchema,
        fetchAttestation,
        messages,
    }
}

export default useAttestation
