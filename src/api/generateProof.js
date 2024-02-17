const express = require("express")
const cors = require("cors")
const path = require("path")
const { generateProof } = require("@semaphore-protocol/proof")
const app = express()
const port = process.env.PORT || 3000 // You can choose your port here

// Assuming "ethers" is needed for other parts of your application
// Note: Importing "hardhat" in a production server script is unusual
// Typically, you would use ethers.js directly without the hardhat environment
const { ethers } = require("ethers")

app.use(express.json())

app.use(
    cors({
        origin: "*", // Allow all origins
    })
)

app.post("/api/generateProof", async (req, res) => {
    try {
        // Adjust the relative path as necessary based on your project structure
        const wasmFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.wasm")
        const zkeyFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.zkey")

        const parsedIdentity = req.body.identity
        const parsedGroup = req.body.group
        const nullifierHashB = ethers.toBigInt(req.body.nullifierHash)
        const signalB = ethers.toBigInt(req.body.signal)

        const fullProof = await generateProof(parsedIdentity, parsedGroup, nullifierHashB, signalB)

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
