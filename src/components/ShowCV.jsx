import React, { useState, useEffect } from "react"
import BN from "bn.js"
import { SemaphoreEthers } from "@semaphore-protocol/data"
import { ethers } from "ethers"
import SempaphoreAddressFile from "../config/semaphore_address.json"
import { Buffer } from "buffer"
window.Buffer = Buffer

// Redux
import { useDispatch, useSelector } from "react-redux"

// Store
import {
    selectProvider,
    selectZKCV,
    selectGroupId,
    selectGroups,
    selectChainId,
} from "../store/selectors"

const ShowCV = ({ groupId }) => {
    console.log("@@@groupId", groupId)
    const [ipfsContentList, setIpfsContentList] = useState([])
    const [semaphoreEthers, setSemaphoreEthers] = useState(null)
    const [verifiedProofs, setVerifiedProofs] = useState(null)
    const chainId = useSelector(selectChainId)
    useEffect(() => {
        const fetchIPFSHashes = async () => {
            if (verifiedProofs && verifiedProofs.length > 0) {
                const bs58 = await import("bs58")
                const hashList = []
                for (let i = 0; i < verifiedProofs.length; i++) {
                    // Fixed iteration over verifiedProofs
                    const signal = verifiedProofs[i].signal
                    const signalBInt = new BN(signal, 10)
                    const bytes32Buffer = signalBInt.toArrayLike(Buffer, "be", 32)
                    const multihashPrefix = Buffer.from([0x12, 0x20])
                    const fullBuffer = Buffer.concat([multihashPrefix, bytes32Buffer])
                    const ipfsHash = bs58.encode(fullBuffer)
                    hashList.push(`https://cf-ipfs.com/ipfs/${ipfsHash}`) // Fixed string concatenation
                }
                console.log(hashList)
                setIpfsContentList(hashList)
            }
        }
        fetchIPFSHashes()
    }, [verifiedProofs])
    useEffect(() => {
        const fetchVerifiedProofs = async () => {
            if (groupId && chainId) {
                try {
                    const semaphoreEthers = new SemaphoreEthers(
                        "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP",
                        {
                            address: SempaphoreAddressFile[chainId],
                            startBlock: 0,
                        }
                    )
                    const proofs = await semaphoreEthers.getGroupVerifiedProofs(groupId.toString())
                    setVerifiedProofs(proofs)
                } catch (error) {
                    console.error("Failed to fetch verified proofs:", error)
                    // Handle errors, for example, by setting an error state
                }
            }
        }
        fetchVerifiedProofs()
    }, [groupId, chainId])
    return (
        <div>
            {ipfsContentList.map((content, index) => (
                <div key={index} className="flex flex-col">
                    <a href={content} target="_blank" rel="noopener noreferrer">
                        {content}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default ShowCV
