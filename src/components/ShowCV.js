import React, { useState, useEffect } from "react"
import bs58 from "bs58"

const ShowCV = (_bytes32) => {
    const [ipfsHash, setIpfsHash] = useState("")

    //TO DO
    //the code we need to use to get the ipfshash from the bytes32
    const decodeBytes32toIPFS = () => {
        const hashHex = "1220" + _bytes32.slice(2)
        const hashBytes = Buffer.from(hashHex, "hex")
        setIpfsHash(bs58.encode(hashBytes))
        return ipfsHash
    }

    useEffect(() => {
        if (_bytes32) {
            decodeBytes32toIPFS()
        }
    }, [_bytes32])
}

export default ShowCV
