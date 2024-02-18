import React, { useState, useEffect } from "react"
import BN from "bn.js"

// Semaphore
import { SemaphoreEthers } from "@semaphore-protocol/data"
import SempaphoreAddressFile from "../config/semaphore_address.json"

// Icons
import CVIcon from "../assets/cv-icon.jpg";

// Buffer
import { Buffer } from "buffer"
window.Buffer = Buffer

// Redux
import { useSelector } from "react-redux"

// Store
import { selectChainId } from "../store/selectors"

const ShowCV = ({ groupId }) => {
    const [ipfsContentList, setIpfsContentList] = useState([])
    const [verifiedProofs, setVerifiedProofs] = useState(null)
    const [selectedCVs, setSelectedCVs] = useState(new Set());
    const chainId = useSelector(selectChainId)

    // Toggle CV selection
    const toggleCVSelection = (cv) => {
        setSelectedCVs(prevSelectedCVs => {
            const updatedSelectedCVs = new Set(prevSelectedCVs);
            if (updatedSelectedCVs.has(cv)) {
                updatedSelectedCVs.delete(cv);
            } else {
                updatedSelectedCVs.add(cv);
            }
            return updatedSelectedCVs;
        });
    };


    // Handle "Select CVs" action
    const handleSelectCVs = () => {
        console.log("Selected CVs:", Array.from(selectedCVs));
        // Further actions based on selected CVs
    };

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
        <div className="border-b border-gray-300 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Applications:</h3>
            
            {ipfsContentList.length === 0 && <div>Loading CVs ...</div>}
            
            <div className="flex flex-wrap gap-2 mt-2">
                {ipfsContentList.map((content, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out w-full max-w-s">
                        <input
                            type="checkbox"
                            checked={selectedCVs.has(content)}
                            onChange={() => toggleCVSelection(content)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <a href={content} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 truncate">
                            <img src={CVIcon} alt="CV Icon" className="w-6 h-6 rounded-full" />
                            {content}
                        </a>
                    </div>
                ))}
            </div>
            
            {selectedCVs.size > 0 && (
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSelectCVs}>
                    Select CVs
                </button>
            )}
        </div>
    );
}

export default ShowCV
