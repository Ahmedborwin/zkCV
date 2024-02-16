import { useState, useEffect } from "react"
// Components
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer"
import SubmitButton from "./common/Button/SubmitButton"

// Hooks
import useSchema from "../hooks/useSchema"

const schemaId = process.env.REACT_APP_EAS_SCHEMA

const Schema = () => {
    const { schemaUID, schemaRecord, fetchSchemaUID, fetchSchema, messages } = useSchema()

    const [schemaReady, setSchemaReady] = useState(false)
    // Accessing schemaId from .env

    const handleGetSchema = async () => {
        setSchemaReady(true)
    }
    useEffect(() => {
        // Call the attestToSchema function with the schemaId when the component mounts
        // Ensure schemaId is not undefined or null
        if (schemaReady) {
            fetchSchema("0x5b08fe501a78efa88c336c018db79399212120345824e425b6b43dbe6067bb7c")
            setSchemaReady(false)
        }
    }, [schemaId, schemaReady])
    return (
        <SemaphoreContainer title="Schema" messages={messages}>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-800">
                    <span className="text-blue-700">Schema UID: &nbsp;</span>
                    {schemaUID ? schemaUID.toString() : ""}
                </p>
                <p className="text-gray-800">
                    <span className="text-blue-700">SchemaRecord: &nbsp;</span>{" "}
                    {schemaRecord ? schemaRecord.toString() : ""}
                </p>
            </div>

            <div className="flex justify-center m-4">
                <div className="mx-4">
                    <SubmitButton onClick={fetchSchemaUID}>Submit Schema</SubmitButton>
                </div>

                <div className="mx-4">
                    <SubmitButton onClick={handleGetSchema}>Fetch Schema Record</SubmitButton>
                </div>
            </div>
        </SemaphoreContainer>
    )
}

export default Schema
