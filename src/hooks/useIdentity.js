import { useEffect, useState, useCallback } from "react"

// Semaphore
import { Identity } from "@semaphore-protocol/identity"
import useAccount from "../hooks/useAccount"

const useIdentity = () => {
    const [identity, setIdentity] = useState()
    const [messages, setMessages] = useState("")
    const { accountDetails } = useAccount()
    useEffect(() => {
        const identityString = localStorage.getItem("identity")

        if (identityString) {
            const identity = new Identity("secret")
            localStorage.setItem("identity", identity.toString())
            setIdentity(identity)
            setMessages("Your Semaphore identity was retrieved from the browser cache 👌🏽")
        } else {
            setMessages("Create your Semaphore identity 👆🏽")
        }
    }, [])

    const createIdentity = useCallback(async () => {
        const identity = new Identity("secret")
        setIdentity(identity)
        localStorage.setItem("identity", identity.toString())
        setMessages("Your new Semaphore identity was just created 🎉")
    }, [])

    return {
        identity,
        messages,
        createIdentity,
    }
}

export default useIdentity
