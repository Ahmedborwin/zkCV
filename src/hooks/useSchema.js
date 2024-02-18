import { useState } from "react"
import SchemaRegistryList from "../config/SchemaRegistry.json"

// EAS
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk"

// Hooks
import useWalletConnected from "./useAccount"

const SCHEMA = "string hashCV, string SempahoreId"

const useSchema = () => {
    const [schemaUID, setSchemaUID] = useState(null)
    const [schemaRecord, setSchemaRecord] = useState(null)
    const [messages, setMessages] = useState(null)

    const { accountDetails, chain } = useWalletConnected()

    const SCHEMA_REGISTRY_CONTRACT_ADDRESS = SchemaRegistryList[chain?.id]

    const fetchSchemaUID = async () => {
        try {
            const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_CONTRACT_ADDRESS).connect(
                accountDetails.signer
            )

            const transaction = await schemaRegistry.register({
                schema: "string hashCV, string SempahoreId",
                revocable: true,
            })

            // Optional: Wait for transaction to be validated
            const newSchemaUID = await transaction.wait()

            setMessages("New Schema UID was created 👌🏽")

            setSchemaUID(newSchemaUID)
        } catch (error) {
            setMessages(`Error occurred when submitting schema ID: ${error}`)
        }
    }

    const fetchSchema = async (_Schema) => {
        try {
            const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_CONTRACT_ADDRESS)
            schemaRegistry.connect(accountDetails.signer)

            const newSchemaRecord = await schemaRegistry.getSchema({ uid: _Schema })

            setMessages("Schema Record Retrieved 👌🏽")

            setSchemaRecord(newSchemaRecord)
        } catch (error) {
            setMessages(`Error occurred when fetching schema: ${error}`)
        }
    }

    return {
        schemaUID,
        schemaRecord,
        fetchSchemaUID,
        fetchSchema,
        messages,
    }
}

export default useSchema
