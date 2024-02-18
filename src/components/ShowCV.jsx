import React, { useState } from "react"
import bs58 from "bs58"

// Icons
import CVIcon from "../assets/cv-icon.jpg";

// Buffer
import { Buffer } from "buffer"
window.Buffer = Buffer

// Hooks
import { useVerifiedProofs } from "../hooks/useVerifiedProofs";
import { useIPFSHashes } from "../hooks/useIPFSHashes";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Store
import { selectProvider, selectZKCV } from "../store/selectors";
import { chooseApplications } from "../store/interactions";

const ShowCV = ({ groupId }) => {
    const dispatch = useDispatch();
    const provider = useSelector(selectProvider);
    const zkCV = useSelector(selectZKCV);
    const verifiedProofs = useVerifiedProofs(groupId);
    const ipfsContentList = useIPFSHashes(verifiedProofs);
    const [selectedCVs, setSelectedCVs] = useState(new Set());

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
    const handleSelectCVs = async () => {
        const selectCVHashes = Array.from(selectedCVs).map(cv => {
            const cvHash = cv.replace("https://cf-ipfs.com/ipfs/", "");

            // Decode Base58 IPFS hash to get the bytes
            const bytes = bs58.decode(cvHash);
            // Convert to hex, slice off the first 2 bytes, and ensure it fits into 32 bytes
            const actualHash = "0x" + bytes.slice(2).toString("hex").substring(0, 64)

            return actualHash;
        })

        const txHash = await chooseApplications(
            provider,
            zkCV,
            selectCVHashes,
            dispatch
        );
        console.log(txHash, "@@@@tx")

        // Further actions based on selected CVs
        setSelectedCVs(new Set());
    };

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
