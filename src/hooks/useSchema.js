import { useState } from "react";

// EAS
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

// Hooks
import useWalletConnected from "./useAccount";

const SCHEMA = "bytest32 privatedata";
const SCHEMA_UID = "0x20351f973fdec1478924c89dfa533d8f872defa108d9c3c6512267d7e7e5dbc2";
const SCHEMA_REGISTRY_CONTRACT_ADDRESS_1 = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797";
// Sepolia 0.26
const SCHEMA_REGISTRY_CONTRACT_ADDRESS_2 = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797";

const useSchema = () => {
    const [schemaUID, setSchemaUID] = useState(null);
    const [schemaRecord, setSchemaRecord] = useState(null);
    const [messages, setMessages] = useState(null);

    const { accountDetails } = useWalletConnected();

    const fetchSchemaUID = async () => {
        try {
            const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_CONTRACT_ADDRESS_1)
                .connect(accountDetails.signer);

            const transaction = await schemaRegistry
                .register({ schema: SCHEMA, revocable: true });

            // Optional: Wait for transaction to be validated
            const newSchemaUID = await transaction.wait();

            setMessages("New Schema UID was created 👌🏽");

            setSchemaUID(newSchemaUID);
        } catch (error) {
            setMessages(`Error occurred when submitting schema ID: ${error}`);
        }
    }

    const fetchSchema = async () => {
        try {
            const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_CONTRACT_ADDRESS_2);
            schemaRegistry.connect(accountDetails.provider);

            const newSchemaRecord = await schemaRegistry
                .getSchema({ uid: SCHEMA_UID });

                setMessages("New Schema Record was created 👌🏽");

            setSchemaRecord(newSchemaRecord);
        } catch (error) {
            setMessages(`Error occurred when fetching schema: ${error}`);
        }
    }

    return {
        schemaUID,
        schemaRecord,
        fetchSchemaUID,
        fetchSchema,
        messages
    }
}

export default useSchema;