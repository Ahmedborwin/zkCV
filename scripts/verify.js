const { ethers } = require("hardhat")
const hre = require("hardhat")

const SEMAPHORE_ADDRESS_FILE = require("../src/config/semaphore_address.json")
const ZKCV_ADDRESS_FILE = require("../src/config/zkCV_address.json")
const VerifierAddressFile = require("../src/config/SemaphoreVerifierAddress.json")

async function main() {
    const chainID = (await ethers.provider.getNetwork()).chainId.toString()
    SempahoreAddress = SEMAPHORE_ADDRESS_FILE[chainID]
    ZKAddress = ZKCV_ADDRESS_FILE[chainID]
    const VerifierAddress = VerifierAddressFile[chainID]

    console.log(SempahoreAddress)
    await hre.run("verify:verify", {
        address: SempahoreAddress,
        constructorArguments: [VerifierAddress],
    })
    console.log(ZKAddress)
    await hre.run("verify:verify", {
        address: ZKAddress,
        constructorArguments: [SempahoreAddress],
    })
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
