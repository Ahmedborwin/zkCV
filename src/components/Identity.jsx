import React from "react";

// Components
import SubmitButton from "./common/Button/SubmitButton";
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";

// Hooks
import useIdentity from "../hooks/useIdentity";

const CreateIdentity = () => {
    const { identity, messages, createIdentity } = useIdentity();

    return (
        <SemaphoreContainer
            title={"Your Identity"}
            messages={messages}
        >
            {identity && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                    <p className="text-gray-800"><span className="text-blue-700">Trapdoor:</span> {identity.trapdoor.toString()}</p>
                    <p className="text-gray-800"><span className="text-blue-700">Nullifier:</span> {identity.nullifier.toString()}</p>
                    <p className="text-gray-800"><span className="text-blue-700">Commitment:</span> {identity.commitment.toString()}</p>
                </div>
            )}

            <div className="flex justify-center mt-4">
                {!identity && (
                    <SubmitButton onClick={createIdentity} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Create Identity
                    </SubmitButton>
                )}
            </div>
        </SemaphoreContainer>
    )
};

export default CreateIdentity;
