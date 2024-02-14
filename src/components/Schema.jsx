// Components
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";
import SubmitButton from "./common/Button/SubmitButton";

// Hooks
import useSchema from "../hooks/useSchema";

const Schema = () => {
    const {
        schemaUID,
        schemaRecord,
        fetchSchemaUID,
        fetchSchema,
        messages
    } = useSchema();

    return (
        <SemaphoreContainer title="Schema" messages={messages}>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-800">
                    <span className="text-blue-700">
                        Schema UID: &nbsp;
                    </span>
                    {schemaUID ? schemaUID.toString() : ""}
                </p>
                <p className="text-gray-800">
                    <span className="text-blue-700">
                        SchemaRecord: &nbsp;
                    </span> {schemaRecord ? schemaRecord.toString() : ""}
                </p>
            </div>

            <div className="flex justify-center m-4">
                <div className="mx-4">
                    <SubmitButton onClick={fetchSchemaUID}>
                        Submit Schema
                    </SubmitButton>
                </div>

                <div className="mx-4">
                    <SubmitButton onClick={fetchSchema} disabled={!schemaUID}>
                        Fetch Schema Record
                    </SubmitButton>
                </div>
            </div>
        </SemaphoreContainer>
    )
}

export default Schema;