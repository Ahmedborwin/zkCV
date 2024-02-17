import React, { useState } from "react"
import axios from "axios"
import { ethers } from "ethers"
import bs58 from "bs58"
import { Buffer } from "buffer"
window.Buffer = Buffer

const PinataUploader = ({ file }) => {
    const [uploadStatus, setUploadStatus] = useState("")
    const [ipfsResponse, setIpfsResponse] = useState(null)
    const [decodedHash, setDecodedHash] = useState(null)

    // New state to hold the IPFS response

    const uploadToPinata = async () => {
        if (!file) {
            console.error("No file to upload")
            return
        }

        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
        let data = new FormData()
        data.append("file", file)

        try {
            setUploadStatus("Uploading...")
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: "66aa6f4bc6281869ae1e",
                    pinata_secret_api_key:
                        "f5d436e5cc4ca6e4fc2e56ad9288fa2250c70706289e275abd7e1660c7ddc4ac",
                },
            })

            if (response.status === 200) {
                // Assuming response.data.IpfsHash is the IPFS hash you received
                console.log("IPFS Hash Before:", response.data.IpfsHash)

                // Decode Base58 IPFS hash to get the bytes
                const bytes = bs58.decode(response.data.IpfsHash)

                // Convert to hex, slice off the first 2 bytes, and ensure it fits into 32 bytes
                const actualHash = "0x" + bytes.slice(2).toString("hex").substring(0, 64)
                console.log("Bytes32 Hex:", actualHash)

                setDecodedHash(`0x${actualHash}`)
                setUploadStatus("Upload successful!")
                // Additional logic to handle the decoded hash...
                localStorage.setItem("CVHash", `${actualHash}`)
            } else {
                console.error("Failed to upload file:", response)
                setUploadStatus("Upload failed.")
            }
        } catch (error) {
            console.error("Error uploading file:", error)
            setUploadStatus("Upload failed.")
        }
    }

    return (
        <div>
            <button onClick={uploadToPinata}>Upload to Pinata</button>
            <p>{uploadStatus}</p>
        </div>
    )
}

export default PinataUploader
