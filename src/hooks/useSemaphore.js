import { useCallback, useState } from "react";
import { ethers } from "ethers";

// Semaphore
import { SemaphoreEthers } from "@semaphore-protocol/data"
import SEMAPHORE_CONTRACT_ADDRESS from "../config/semaphore_address.json";

// Redux
import { useSelector } from "react-redux";

// Store
import { selectChainId } from "../store/selectors";


const useSemaphore = () => {
    const [users, setUsers] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const chainId = useSelector(selectChainId);

    const NETWORK = chainId === 80001 ? "maticmum" : "";

    const refreshUsers = useCallback(async (groupId) => {
        const semaphore = new SemaphoreEthers(NETWORK, {
            address: SEMAPHORE_CONTRACT_ADDRESS[chainId]
        })

        const members = await semaphore.getGroupMembers(groupId)

        setUsers(members)
    }, [])

    const addUser = useCallback(
        (user) => {
            setUsers([...users, user])
        },
        [users]
    )

    const refreshFeedback = useCallback(async (groupId) => {
        const semaphore = new SemaphoreEthers(NETWORK, {
            address: SEMAPHORE_CONTRACT_ADDRESS[chainId]
        })

        const proofs = await semaphore.getGroupVerifiedProofs(groupId)

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
