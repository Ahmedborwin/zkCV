const fs = require("fs")
const { ethers } = require("hardhat")

const SEMAPHORE_ADDRESS_FILE = require("../src/config/semaphore_address.json")
const ZKCV_ADDRESS_FILE = require("../src/config/zkCV_address.json")
const VERIFIER_ADDRESS_FILE = require("../src/config/SemaphoreVerifierAddress.json")

const SEMPAHORE_FILE_PATH = "src/config/semaphore_address.json"
const ZKCV_ADDRESS_FILE_PATH = "src/config/zkCV_address.json"
const VERIFIER_ADDRESS_FILE_PATH = "src/config/SemaphoreVerifierAddress.json"

const SEMAPHORE_ABI_FILE = "src/config/semaphore_ABI.json"
const ZKCV_ABI_FILE = "src/config/zkCV_ABI.json"

module.exports = async (sempahoreAddress, zkAddress, semaphoreVerifierAddress) => {
    //need chainId
    //const chainId = ethers.provider.network.chainId.toString()

    const chainId = "80001"

    await updateZKAddress(chainId, zkAddress)
    await updateSemaphoreAddress(chainId, sempahoreAddress)
    await updateVerifierAddress(chainId, semaphoreVerifierAddress)

    await updateZKABI(zkAddress)
    await updateSemaphoreABI(sempahoreAddress)
}

async function updateZKAddress(chainId, zkAddress) {
    //get contract

    const zkAddressList = ZKCV_ADDRESS_FILE

    if (chainId in zkAddressList) {
        if (!zkAddressList[chainId].includes(zkAddress)) {
            zkAddressList[chainId] = zkAddress
        }
    } else {
        zkAddressList[chainId] = zkAddress
    }
    fs.writeFileSync(ZKCV_ADDRESS_FILE_PATH, JSON.stringify(zkAddressList, null, 2))
}

async function updateZKABI(zkAddress) {
    const ZKCV = await ethers.getContractAt("ZeroKnowledgeCV", zkAddress)
    fs.writeFileSync(ZKCV_ABI_FILE, ZKCV.interface.format(ethers.utils.FormatTypes.json))
}

async function updateSemaphoreAddress(chainId, SemaphoreAddress) {
    //read consumerAddress file
    const SemaphoreAddressList = SEMAPHORE_ADDRESS_FILE

    if (chainId in SemaphoreAddressList) {
        if (!SemaphoreAddressList[chainId].includes(SemaphoreAddress)) {
            SemaphoreAddressList[chainId] = SemaphoreAddress
        }
    } else {
        SemaphoreAddressList[chainId] = SemaphoreAddress
    }
    fs.writeFileSync(SEMPAHORE_FILE_PATH, JSON.stringify(SemaphoreAddressList, null, 2))
}

async function updateSemaphoreABI(SemaphoreAddress) {
    const semaphoreContract = await ethers.getContractAt("Semaphore", SemaphoreAddress)
    fs.writeFileSync(
        SEMAPHORE_ABI_FILE,
        semaphoreContract.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateVerifierAddress(chainId, verifierAddress) {
    const verifierAddressList = VERIFIER_ADDRESS_FILE

    if (chainId in verifierAddressList) {
        if (!verifierAddressList[chainId].includes(verifierAddress)) {
            verifierAddressList[chainId] = verifierAddress
        }
    } else {
        verifierAddressList[chainId] = verifierAddress
    }
    fs.writeFileSync(VERIFIER_ADDRESS_FILE_PATH, JSON.stringify(verifierAddressList, null, 2))
}
