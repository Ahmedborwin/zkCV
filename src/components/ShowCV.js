import React, { useState, useEffect } from "react"
import bs58 from "bs58"
import BN from "bn.js"
import { Buffer } from "buffer"
window.Buffer = Buffer

const ShowCV = async (signal) => {
    const [ipfsHash, setIpfsHash] = useState("")

    const bs58 = await import("bs58")
    const signal = verifiedProofs[0].signal
    const signalBInt = new BN(signal, 10)
    const bytes32Buffer = signalBInt.toArrayLike(Buffer, "be", 32)
    const multihashPrefix = Buffer.from([0x12, 0x20])
    const fullBuffer = Buffer.concat([multihashPrefix, bytes32Buffer])

    // Encode the resulting Buffer to a Base58 string to get the IPFS hash
    const _ipfsHash = bs58.encode(fullBuffer)
    setIpfsHash(_ipfsHash)
}

export default ShowCV
