import { useState, useCallback } from "react"
import { Buffer } from "buffer"
window.Buffer = Buffer

const useSemaphoreProofs = () => {
    // Removed async
    const [proof, setProof] = useState(null)
    const [error, setError] = useState(null)
    // Adjust the relative path as necessary based on your project structure
    // Use URL paths relative to the public directory
    const snarkArtifacts = {
        wasmFilePath: `https://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm`,
        zkeyFilePath: `https://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey`,
    }
    const generateAndVerifyProof = useCallback(async (identity, group) => {
        try {
            const semaphoreProof = await import("@semaphore-protocol/proof")
            const { generateProof } = semaphoreProof

            const fullProof = await generateProof(identity, group, 12, 12)

            // console.log("Verification Result:", verificationResult);
            setProof(proof)
        } catch (err) {
            console.error("Error generating or verifying proof:", err)
            setError(err)
        }
    }, [])

    return { generateAndVerifyProof, proof, error }
}

export default useSemaphoreProofs
