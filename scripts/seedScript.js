const hre = require("hardhat")
const { ethers } = hre
const fs = require("fs")

const zkAddressFile = require("../src/config/zkCV_address.json")
const zk_ABI = require("../src/config/zkCV_ABI.json")

List = [
    {
        experience: ethers.BigNumber.from(12),
        title: "manager",
    },
    {
        experience: ethers.BigNumber.from(11),
        title: "junior",
    },
    {
        experience: ethers.BigNumber.from(10),
        title: "architect",
    },
    {
        experience: ethers.BigNumber.from(1),
        title: "researcher",
    },
    {
        experience: ethers.BigNumber.from(20),
        title: "hacker",
    },
    {
        experience: ethers.BigNumber.from(5),
        title: "janitor",
    },
]

//create contract
const seedScript = async () => {
    //check for network - should helpers
    const rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL
    if (!rpcUrl) {
        console.error("NO RPC  URL")
    }
    const chainId = (await ethers.provider.getNetwork()).chainId
    if (!chainId) {
        console.error("NO ChainID")
    }
    const provider = new hre.ethers.providers.JsonRpcProvider(rpcUrl)
    if (!provider) {
        console.error("NO Provider")
    }

    const privateKey = process.env.REACT_APP_PRIVATE_KEY // fetch PRIVATE_KEY
    const wallet = new hre.ethers.Wallet(privateKey)
    const signer = wallet.connect(provider)

    const zkAddress = zkAddressFile[chainId]
    console.log(zkAddress)

    // Connect to the contract
    const zkContract = new ethers.Contract(zkAddress, zk_ABI, signer)
    let tx
    for (let i = 0; i < List.length; i++) {
        item = List[i]
        tx = await zkContract.createGroup(item.experience, item.title)
        await tx.wait()
    }
}

seedScript().catch((error) => {
    console.error(error)
    process.exit = 1
})
