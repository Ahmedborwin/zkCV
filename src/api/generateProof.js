const express = require("express")
const cors = require("cors")
const path = require("path")

const { generateProof } = require("@semaphore-protocol/proof")
const { Group } = require("@semaphore-protocol/group")
const { SemaphoreEthers, getSupportedNetworks } = require("@semaphore-protocol/data")
const { Identity } = require("@semaphore-protocol/identity")
const SempaphoreAddressFile = require("../config/semaphore_address")
const app = express()
const port = process.env.PORT || 3000 // You can choose your port here

const { ethers } = require("ethers")

app.use(express.json())

app.use(
    cors({
        origin: "*", // Allow all origins
    })
)

app.post("/api/generateProof", async (req, res) => {
    let zeroKnowledgeCV, zeroKnowledgeCVAddress, signer
    const groupId = ethers.toNumber(req.body.group)
    try {
        console.log("----------- API START HERE -----------")
        //----------------------------------------------------------------------

        const identity = new Identity("secret")

        const semaphoreEthers = new SemaphoreEthers(
            "https://scroll-sepolia-testnet.rpc.thirdweb.com",
            {
                address: SempaphoreAddressFile[req.body?.chainId],
                startBlock: 3010006,
            }
        )

        const members = await semaphoreEthers.getGroupMembers(groupId.toString())
        console.log("@@@@members", members)

        const group = new Group(groupId, 20, members)
        // Adjust the relative path as necessary based on your project structure
        const wasmFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.wasm")
        const zkeyFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.zkey")

        const signal = ethers.toBigInt(req.body.signal)

        const nullifier = ethers.toBigInt(req.body.nullifier)

        const fullProof = await generateProof(identity, group, nullifier, signal, {
            zkeyFilePath,
            wasmFilePath,
        })

        // Check if fullProof is truthy and return it; otherwise, send a failure message
        if (fullProof) {
            res.json(fullProof)
        } else {
            // It's better to use HTTP status codes to indicate success or failure
            res.status(400).json({ message: "Failed proof generation" })
        }
    } catch (error) {
        // Log the error and return a message indicating proof generation failed
        console.error("Proof generation error:", error)
        res.status(500).json({ message: error })
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
