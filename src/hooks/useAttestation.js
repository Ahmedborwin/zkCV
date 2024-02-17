import { useState } from "react"

// EAS
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import useEasSdk from "./useEAS"
import schemaList from "../config/EASSchema.json"
import useAccount from "./useAccount"

const RECIPIENT = "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029"

//call this when submitting CV - pass hash of CV value and semaphore ID

const useAttestation = (cvHash, Id) => {
    const CVData = [
        {
            name: "hashCV",
            value: Id,
            type: "uint256",
        },
        {
            name: "SempahoreId",
            value: cvHash,
            type: "string",
        },
        { name: "timeAttested", value: "", type: "uint256" },
    ]
    const [attestationUID, setAttestationUID] = useState(null)
    const [attestation, setAttestation] = useState(null)
    const [messages, setMessages] = useState(null)

    const { eas } = useEasSdk()

    const { chain } = useAccount()

    const schema = schemaList[chain.id]

    const attestToSchema = async (schemaId) => {
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("string hashCV, string SempahoreId")
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

            //TO DO - MAKE CLEAR TO CLIENT THEY NEED TO SAVE ATTESTATION
            setAttestationUID(newAttestationUID)

            console.log(`New attestation UID: ${newAttestationUID}`)
        } catch (messages) {
            setMessages(`Error while creating attestation: ${messages}`)
        }
    }

    const fetchAttestation = async () => {
        try {
            const newAttestation = await eas.getAttestation(attestationUID)

            console.log(`Fetched attestation: ${newAttestation}`)
            setAttestation(newAttestation)
        } catch (messages) {
            setMessages(`Error while fetching attestation: ${messages}`)
        }
    }

    return {
        attestationUID,
        attestation,
        attestToSchema,
        fetchAttestation,
        messages,
    }
}

export default useAttestation
