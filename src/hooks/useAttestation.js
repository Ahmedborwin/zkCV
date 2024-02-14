import { useState } from "react";

// EAS
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import useEasSdk from "./useEAS";

const RECIPIENT = "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029";
const CVData = [
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
];

const useAttestation = () => {
    const [attestationUID, setAttestationUID] = useState(null);
    const [attestation, setAttestation] = useState(null);
    const [messages, setMessages] = useState(null);

    const { eas } = useEasSdk();

    const fetchAttestationUID = async (schemaId) => {
        try {
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("bytes32 hashOfCV, address CVOwner")
            const encodedData = schemaEncoder.encodeData([...CVData])

            const transaction = await eas.attest({
                schema: schemaId,
                data: {
                    recipient: RECIPIENT,
                    expirationTime: 0,
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    data: encodedData,
                },
            })

            const newAttestationUID = await transaction.wait();

            setAttestationUID(newAttestationUID)

            console.log(`New attestation UID: ${newAttestationUID}`);
        } catch (messages) {
            setMessages(`Error while creating attestation: ${messages}`);
        }
    }

    const fetchAttestation = async () => {
        try {
            const newAttestation = await eas.getAttestation(attestationUID);

            console.log(`Fetched attestation: ${newAttestation}`);
            setAttestation(newAttestation);
        } catch (messages) {
            setMessages(`Error while fetching attestation: ${messages}`);
        }
    }

    return {
        attestationUID,
        attestation,
        fetchAttestationUID,
        fetchAttestation,
        messages
    }
}

export default useAttestation;