import { useState, useCallback, useEffect } from "react";

// Semaphore
import { Identity } from "@semaphore-protocol/identity";

// Hooks
import useSemaphore from "./useSemaphore";

const useGroupJoin = () => {
    const [identity, setIdentity] = useState();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState("");

    const { addUser } = useSemaphore();

    const joinGroup = useCallback(async () => {
        if (!identity) {
            return
        }

        setLoading(true)
        setMessages(`Joining the Feedback group...`)

        let response;

        if (process.env.OPENZEPPELIN_AUTOTASK_WEBHOOK) {
            response = await fetch(process.env.OPENZEPPELIN_AUTOTASK_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    abi: Feedback.abi,
                    address: process.env.FEEDBACK_CONTRACT_ADDRESS,
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

            setMessages(`You joined the Feedback group event 🎉 Share your feedback anonymously!`)
        } else {
            setMessages("Some error occurred, please try again!")
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

    return {
        messages,
        loading,
        joinGroup,
        setMessages
    }
}

export default useGroupJoin;