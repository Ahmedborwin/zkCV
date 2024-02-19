import { useState, useEffect } from "react"

// Redux
import { useSelector } from "react-redux"

// Store
import { selectChainId } from "../store/selectors"

// Semaphore
import SemaphoreAddressFile from "../config/semaphore_address.json"
import { SemaphoreEthers } from "@semaphore-protocol/data"

export const useVerifiedProofs = (groupId) => {
    const [verifiedProofs, setVerifiedProofs] = useState(null)
    const [semaphoreEthers, setSemaphoreEthers] = useState(null)
    const chainId = useSelector(selectChainId)

    useEffect(() => {
        const fetchSemaphoreEthers = () => {
            try {
                const newSemaphoreEthers = new SemaphoreEthers(
                    "https://scroll-sepolia-testnet.rpc.thirdweb.com",
                    {
                        address: SemaphoreAddressFile[chainId],
                        startBlock: 3010006,
                    }
                )
                setSemaphoreEthers(newSemaphoreEthers)
            } catch (error) {
                console.error("Failed to fetch semaphore ethers:", error)
            }
        }

        if (chainId) fetchSemaphoreEthers()
    }, [chainId])

    useEffect(() => {
        const fetchVerifiedProofs = async () => {
            try {
                const proofs = await semaphoreEthers.getGroupVerifiedProofs(groupId.toString())
                setVerifiedProofs(proofs)
            } catch (error) {
                console.error("Failed to fetch verified proofs:", error)
            }
        }
        if (groupId && semaphoreEthers) fetchVerifiedProofs()
    }, [groupId, semaphoreEthers])

    return verifiedProofs
}
