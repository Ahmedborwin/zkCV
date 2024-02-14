import React, { useState, useEffect, useCallback } from "react";
import SubmitButton from "./common/Button/SubmitButton";
// Semaphore
import { Identity } from "@semaphore-protocol/identity";

const CreateIdentity = () => {
    const [identity, setIdentity] = useState();
    const [messages, setMessages] = useState("");

    useEffect(() => {
        const identityString = localStorage.getItem("identity");

        if (identityString) {
            const identity = new Identity(identityString);
            setIdentity(identity);
            setMessages("Your Semaphore identity was retrieved from the browser cache 👌🏽");
        } else {
            setMessages("Create your Semaphore identity 👆🏽");
        }
    }, []);

    const createIdentity = useCallback(async () => {
        const identity = new Identity();
        setIdentity(identity);
        localStorage.setItem("identity", identity.toString());
        setMessages("Your new Semaphore identity was just created 🎉");
    }, []);

    return (
        <div className="mx-8">
            <h3 className="text-center text-xl font-bold mb-8">Your Identity</h3>

            {identity && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                    <p className="text-gray-800"><span className="text-blue-700">Trapdoor:</span> {identity.trapdoor.toString()}</p>
                    <p className="text-gray-800"><span className="text-blue-700">Nullifier:</span> {identity.nullifier.toString()}</p>
                    <p className="text-gray-800"><span className="text-blue-700">Commitment:</span> {identity.commitment.toString()}</p>
                </div>
            )}

            <div className="bg-blue-100 text-blue-700 p-4 rounded-lg my-4 text-center">
                {messages}
            </div>

            <div className="flex justify-center">
                {!identity ? (
                    <SubmitButton onClick={createIdentity} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Create Identity
                    </SubmitButton>
                ) : (
                    <SubmitButton onClick={createIdentity} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        New
                    </SubmitButton>
                )}
            </div>
        </div>
    );
};

export default CreateIdentity;
