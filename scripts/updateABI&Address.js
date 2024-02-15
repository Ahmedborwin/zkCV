const fs = require("fs")
const { ethers } = require("hardhat")

const SEMAPHORE_ADDRESS_FILE = "src/config/semaphore_address.json"
const ZKCV_ADDRESS_FILE = "src/config/zkCV_address.json"

const SEMAPHORE_ABI_FILE = "src/config/semaphore_ABI.json"
const ZKCV_ABI_FILE = "src/config/zkCV_ABI.json"

module.exports = async (sempahoreAddress, zkAddress) => {
    //need chainId
    const chainId = ethers.provider.network.chainId.toString()

    await updateZKAddress(chainId, zkAddress)
    await updateSemaphoreAddress(chainId, sempahoreAddress)

    await updateZKABI(zkAddress)
    await updateSemaphoreABI(sempahoreAddress)
}

async function updateZKAddress(chainId, zkAddress) {
    //get contract

    const zkAddressList = JSON.parse(fs.readFileSync(ZKCV_ADDRESS_FILE, "utf8"))

    if (chainId in zkAddressList) {
        if (!zkAddressList[chainId].includes(zkAddress)) {
            zkAddressList[chainId] = zkAddress
        }
    } else {
        zkAddressList[chainId] = zkAddress
    }
    fs.writeFileSync(ZKCV_ADDRESS_FILE, JSON.stringify(zkAddressList, null, 2))
}

async function updateZKABI(zkAddress) {
    const ZKCV = await ethers.getContractAt("ZeroKnowledgeCV", zkAddress)
    fs.writeFileSync(ZKCV_ABI_FILE, ZKCV.interface.format(ethers.utils.FormatTypes.json))
}

async function updateSemaphoreAddress(chainId, SemaphoreAddress) {
    //read consumerAddress file
    const SemaphoreAddressList = JSON.parse(fs.readFileSync(SEMAPHORE_ADDRESS_FILE, "utf8"))

    if (chainId in SemaphoreAddressList) {
        if (!SemaphoreAddressList[chainId].includes(SemaphoreAddress)) {
            SemaphoreAddressList[chainId] = SemaphoreAddress
        }
    } else {
        SemaphoreAddressList[chainId] = SemaphoreAddress
    }
    fs.writeFileSync(SEMAPHORE_ADDRESS_FILE, JSON.stringify(SemaphoreAddressList, null, 2))
}

async function updateSemaphoreABI(SemaphoreAddress) {
    const semaphoreContract = await ethers.getContractAt("Semaphore", SemaphoreAddress)
    fs.writeFileSync(
        SEMAPHORE_ABI_FILE,
        semaphoreContract.interface.format(ethers.utils.FormatTypes.json)
    )
}
