import React, { useState, useCallback, useEffect } from "react";
import useSemaphore from "../hooks/useSemaphore";
import SubmitButton from "./common/Button/SubmitButton";

import { Identity } from "@semaphore-protocol/identity";

const JoinGroups = () => {
    const { users, refreshUsers, addUser } = useSemaphore();

    const [identity, setIdentity] = useState();
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(false);

    const userHasJoined = useCallback((identity) => {
        return users.includes(identity.commitment.toString());
    }, [users])

    const joinGroup = useCallback(async () => {
        if (!identity) {
            return
        }

        setLoading(true)
        setLogs(`Joining the Feedback group...`)

        let response;

        if (env.OPENZEPPELIN_AUTOTASK_WEBHOOK) {
            response = await fetch(env.OPENZEPPELIN_AUTOTASK_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    abi: Feedback.abi,
                    address: env.FEEDBACK_CONTRACT_ADDRESS,
                    functionName: "joinGroup",
                    functionParameters: [identity.commitment.toString()]
                })
            })
        } else {
            response = await fetch("api/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identityCommitment: identity.commitment.toString()
                })
            })
        }

        if (response.status === 200) {
            addUser(identity.commitment.toString())

            setLogs(`You joined the Feedback group event 🎉 Share your feedback anonymously!`)
        } else {
            setLogs("Some error occurred, please try again!")
        }

        setLoading(false);
    }, [identity])

    useEffect(() => {
        const identityString = localStorage.getItem("identity");

        if (!identityString) {
            return
        }

        setIdentity(new Identity(identityString));
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            setMessages(`${users.length} user${users.length > 1 ? "s" : ""} retrieved from the group 🤙🏽`);
        }
    }, [users])

    return (
        <div className="mx-8">
            <h3 className="text-center text-xl font-bold mb-8">Groups</h3>

            <h5>Feedback users ({users.length})</h5>
            <SubmitButton onClick={refreshUsers}>
                Refresh
            </SubmitButton>

            <div>
                <SubmitButton onClick={joinGroup} disabled={loading || !identity || userHasJoined(identity)}>
                    Join Group
                </SubmitButton>
            </div>

            {users.length > 0 && (
                <div>
                    {users.map((user, i) => (
                        <div key={i} >
                            <p>{user}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default JoinGroups;