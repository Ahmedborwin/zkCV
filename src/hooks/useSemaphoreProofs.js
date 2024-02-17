import { useState, useCallback } from "react"
import { Buffer } from "buffer"
window.Buffer = Buffer

const useSemaphoreProofs = () => {
    // Removed async
    const [proof, setProof] = useState(null)
    const [error, setError] = useState(null)
    // Adjust the relative path as necessary based on your project structure
    // Use URL paths relative to the public directory
    const wasmFilePath = "http://192.168.0.16:5175/public/semaphore.wasm"

    const zkeyFilePath = "http://192.168.0.16:5175/public/semaphore.zkey"
    const generateAndVerifyProof = useCallback(async (identity, group, nullifierHash, signal) => {
        try {
            const semaphoreProof = await import("@semaphore-protocol/proof")
            const { generateProof, verifyProof } = semaphoreProof

            const fullProof = await generateProof(identity, group, nullifierHash, signal)
            // Assuming verifyProof is also being used correctly, uncomment when needed
            // const verificationResult = await verifyProof(/* parameters for verifyProof */);

            console.log("Generated Proof:")
            // console.log("Verification Result:", verificationResult);
            setProof(fullProof)
        } catch (err) {
            console.error("Error generating or verifying proof:", err)
            setError(err)
        }
    }, [])

    return { generateAndVerifyProof, proof, error }
}

export default useSemaphoreProofs
