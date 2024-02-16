import useAttestation from "../hooks/useAttestation"
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer"
import SubmitButton from "./common/Button/SubmitButton"
import { useState, useEffect } from "react"

const Attestation = () => {
    const { attestationUID, attestation, attestToSchema, fetchAttestation, messages } =
        useAttestation()

    const [attestToSchemaReady, setAttestToSchemaReady] = useState(false)
    // Accessing schemaId from .env
    const schemaId = process.env.REACT_APP_EAS_SCHEMA
    const handleAttestToSchema = async () => {
        setAttestToSchemaReady(true)
    }

    useEffect(() => {
        // Call the attestToSchema function with the schemaId when the component mounts
        // Ensure schemaId is not undefined or null
        if (attestToSchemaReady) {
            attestToSchema(schemaId)
            setAttestToSchemaReady(false)
        }
    }, [schemaId, attestToSchemaReady])

    return (
        <SemaphoreContainer title="Attestation" messages={messages}>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-800">
                    <span className="text-blue-700">Attestation UID: &nbsp;</span>
                    {attestationUID ? attestationUID.toString() : ""}
                </p>
                <p className="text-gray-800">
                    <span className="text-blue-700">Attestation: &nbsp;</span>
                    {attestation ? attestation.toString() : ""}
                </p>
            </div>

            <div className="flex justify-center m-4">
                <div className="mx-4">
                    <SubmitButton onClick={handleAttestToSchema}>Submit Attestation</SubmitButton>
                </div>

                <div className="mx-4">
                    <SubmitButton onClick={fetchAttestation} disabled={!attestationUID}>
                        Fetch Attestation
                    </SubmitButton>
                </div>
            </div>
        </SemaphoreContainer>
    )
}

export default Attestation
