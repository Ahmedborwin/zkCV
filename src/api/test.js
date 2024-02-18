// Adjust the relative path as necessary based on your project structure
const wasmFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.wasm")
const zkeyFilePath = path.resolve(__dirname, "../../snark-artifacts/20/semaphore.zkey")

// Function to convert stringified BigInts (e.g., "123n") back to BigInt
function convertStringToBigInt(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "string" && obj[key].match(/^\d+n$/)) {
            // Convert string to BigInt
            obj[key] = BigInt(obj[key].slice(0, -1))
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            // Recursively apply conversion for nested objects
            convertStringToBigInt(obj[key])
        }
    }
}

// Manually apply conversion to request body
convertStringToBigInt(req.body)

const { identity, group, nullifierHash, signal } = req.body

console.log("@@@iden", identity)
console.log("@@@parsedGroup", group)
console.log("@@@nullifierHashB", nullifierHash)
console.log("@@@signalB", signal)

const parsedIdentity = identity
const parsedGroup = group
const nullifierHashB = ethers.toBigInt(nullifierHash)
const signalB = ethers.toBigInt(signal)

console.log("@@@nullifierHashB", nullifierHashB)
console.log("@@@signalB", signalB)

const fullProof = await generateProof(parsedIdentity, parsedGroup, 12345, 12345, {
    wasmFilePath: wasmFilePath,
    zkeyFilePath: zkeyFilePath,
})
