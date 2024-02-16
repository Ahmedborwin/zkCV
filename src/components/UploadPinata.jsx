import React, { useState, useEffect } from "react"
import axios from "axios"
import bs58 from "bs58"

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
                const actualHash = bs58.decode(response.data.IpfsHash).slice(2).toString("hex")

                setDecodedHash(`0x${actualHash}`)
                setUploadStatus("Upload successful!")
                // Additional logic to handle the decoded hash...
                localStorage.setItem("CVHash", `0x${actualHash}`)
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
