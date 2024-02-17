const hre = require("hardhat")
const { run, ethers } = hre
const updateContractInfo = require("../scripts/updateABI&Address")

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
    const zkFactory = await ethers.getContractFactory("ZeroKnowledgeCV")

    // Deploy the contract with the library linked
    const zeroKnowledgeCV = await zkFactory.deploy(semaphore.address)
    await zeroKnowledgeCV.deployed()
    console.log(`ZeroKnowledgeCV deployed to: ${zeroKnowledgeCV.address}`)
    //record new contract address and ABI
    await updateContractInfo(semaphore.address, zeroKnowledgeCV.address, semaphoreVerifierAddress)

    return { semaphore, zeroKnowledgeCV, semaphoreVerifierAddress }
}

module.exports = { main }
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
