import { useCallback, useState } from "react";
import { ethers } from "ethers";

// Semaphore
import { SemaphoreEthers } from "@semaphore-protocol/data"

const ethereumNetwork = "http://localhost:8545"

const useSemaphore = () => {
    const [users, setUsers] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const refreshUsers = useCallback(async () => {
        const semaphore = new SemaphoreEthers(ethereumNetwork, {
            address: process.env.SEMAPHORE_CONTRACT_ADDRESS
        })

        const members = await semaphore.getGroupMembers(process.env.GROUP_ID)

        setUsers(members)
    }, [])

    const addUser = useCallback(
        (user) => {
            setUsers([...users, user])
        },
        [users]
    )

    const refreshFeedback = useCallback(async () => {
        const semaphore = new SemaphoreEthers(ethereumNetwork, {
            address: process.env.SEMAPHORE_CONTRACT_ADDRESS
        })

        const proofs = await semaphore.getGroupVerifiedProofs(process.env.GROUP_ID)

        setFeedback(proofs.map(({ signal }) => ethers.decodeBytes32String(ethers.toBigInt(signal))))
    }, [])

    const addFeedback = useCallback(
        (feedback) => {
            setFeedback([...feedback, feedback])
        },
        [feedback]
    )

    return {
        users,
        feedback,
        refreshUsers,
        addUser,
        refreshFeedback,
        addFeedback
    }
}

export default useSemaphore;
