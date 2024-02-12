const hre = require("hardhat")
const { run, ethers } = hre

async function main() {
    let semaphore, semaphoreVerifierAddress, poseidonAddress
    const chainID = (await hre.ethers.provider.getNetwork()).chainId.toString()

    //Deploy Semaphore Contracts using Task from "@semaphore-protocol/hardhat"

    const sempahoreContracts = await run("deploy:semaphore", {
        logs: true,
    })
    semaphore = sempahoreContracts.semaphore
    semaphoreVerifierAddress = sempahoreContracts.semaphoreVerifierAddress
    poseidonAddress = sempahoreContracts.poseidonAddress

    // Link the library
    const zkFactory = await ethers.getContractFactory("ZeroKnowledgeCV", {
        libraries: {
            PoseidonT3: poseidonAddress,
        },
    })

    // Deploy the contract with the library linked
    const zeroKnowledgeCV = await zkFactory.deploy(semaphoreVerifierAddress)
    await zeroKnowledgeCV.waitForDeployment()
    console.log(`ZeroKnowledgeCV deployed to: ${await zeroKnowledgeCV.getAddress()}`)
    return { zeroKnowledgeCV, semaphoreVerifierAddress }
}

module.exports = { main }
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
