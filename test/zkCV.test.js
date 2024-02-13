// const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect } = require("chai")
const { main } = require("../scripts/deploy")
const { Identity } = require("@semaphore-protocol/identity")
const { Group } = require("@semaphore-protocol/group")
const { generateProof, verifyProof } = require("@semaphore-protocol/proof")
const { SemaphoreEthers, getSupportedNetworks } = require("@semaphore-protocol/data")
const path = require("path")
const hre = require("hardhat")
require("../snark-artifacts/20/semaphore.json")

describe("zkCV", function () {
    // TO DO - create identity commitment

    let employer,
        deployer,
        zeroKnowledgeCV,
        semaphoreVerifierAddress,
        semaphoreAddress,
        zeroKnowledgeCVAddress,
        signer

    const identity = new Identity("secret-message")
    // const group = 1
    const signal = 123456789

    beforeEach(async () => {
        const accounts = await hre.ethers.getSigners()
        deployer = accounts[0]
        employer = accounts[1]

        rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL
        const provider = new hre.ethers.JsonRpcProvider(rpcUrl)
        const privateKey = process.env.PRIVATE_KEY
        const wallet = new hre.ethers.Wallet(privateKey)
        signer = wallet.connect(provider)

        try {
            // const contractsDeployed = await main()
            // zeroKnowledgeCV = contractsDeployed.zeroKnowledgeCV
            zeroKnowledgeCV = await hre.ethers.getContractAt(
                "Semaphore",
                "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131",
                signer
            )
            semaphoreAddress = await zeroKnowledgeCV.getAddress()

            // semaphoreVerifierAddress = contractsDeployed.semaphoreVerifierAddress
            // Additional logic using deployed contract addresses
        } catch (error) {
            console.error("Deployment failed:", error)
        }
    })
    describe("Deployment", function () {
        // it("zkCV is deployed", async () => {
        //     await expect(zeroKnowledgeCV.createGroup(1, deployer.address)).emit(
        //         zeroKnowledgeCV,
        //         "GroupCreated"
        //     )
        // })
        // it("Add new applicant", async () => {
        //     await zeroKnowledgeCV.createGroup(1, deployer.address)

        //     await expect(zeroKnowledgeCV.connect(deployer).addMember(1, identity.commitment)).emit(
        //         zeroKnowledgeCV,
        //         "MemberAdded"
        //     )
        // })
        // it("submit application (using offchain group)", async () => {
        //     const group = new Group(1, 20)
        //     group.addMember(identity.commitment)

        //     // Adjust the relative path as necessary based on your project structure
        //     const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
        //     const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")

        //     const nullifierHash = 123456789

        //     const fullProof = await generateProof(identity, group, nullifierHash, signal, {
        //         zkeyFilePath,
        //         wasmFilePath,
        //     })

        //     const proofBool = await verifyProof(fullProof, 20)

        //     expect(proofBool).equal(true)
        // })
        it("submit application using Onchain Group", async () => {
            const groupId = 300
            console.log("got here")
            await zeroKnowledgeCV
                .connect(signer)
                .createGroup(groupId, "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029")
            console.log("got here 2")
            await zeroKnowledgeCV.connect(signer).addMember(groupId, identity.commitment)

            const groupRoot = await zeroKnowledgeCV.getMerkleTreeRoot(groupId)

            const groupSize = await zeroKnowledgeCV.getMerkleTreeSize(groupId)

            console.log("stage 2")
            console.log("semaphoreAddress", semaphoreAddress)

            const semaphoreEthers = new SemaphoreEthers("maticmum", {
                provider: "alchemy",
                apiKey: "LCWjuGIGXSD0auG-b9ESZdI87BeQCNrp",
                address: semaphoreAddress,
                startBlock: 0,
            })

            const groupIds = await semaphoreEthers.getGroupIds()
            console.log(groupIds)

            const members = await semaphoreEthers.getGroupMembers(groupId.toString())

            console.log("stage 3")

            const group = new Group(groupId, groupSize, members)

            console.log("identity", identity)
            console.log("group", group)
            console.log("groupRoot", groupRoot)
            console.log("signal", signal)

            const nullifierHash = 123456789

            // Adjust the relative path as necessary based on your project structure
            const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
            const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")

            const fullProof = await generateProof(identity, group, nullifierHash, signal, {
                zkeyFilePath,
                wasmFilePath,
            })
            console.log("stage 4")

            //call submit application
            await expect(
                zeroKnowledgeCV.submitApplication(signal, groupRoot, groupId, fullProof.proof)
            ).emit(zeroKnowledgeCV, "ApplicationSubmitted")
        })
    })
})
