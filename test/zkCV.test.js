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
    const signal = 1234567

    beforeEach(async () => {
        const accounts = await hre.ethers.getSigners()
        deployer = accounts[0]
        employer = accounts[1]

        try {
            // const contractsDeployed = await main()
            // zeroKnowledgeCV = contractsDeployed.zeroKnowledgeCV
            // sempahoreContract = contractsDeployed.semaphore
            //get signer
            provider = new hre.ethers.providers.JsonRpcProvider(
                "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP"
            )
            const wallet = new hre.ethers.Wallet(
                "bf0c60264942544c1ecb566e558207f5d84d08bd66d524bbc7df9b92b9d6f946"
            )
            const signer = wallet.connect(provider)
            zeroKnowledgeCV = await hre.ethers.getContractAt(
                "ZeroKnowledgeCV",
                "0x405bD5b3bC0539d3a47131796264BdeD736F246b",
                signer
            )

            zeroKnowledgeCVAddress = zeroKnowledgeCV.address
            console.log("@@@zeroKnowledgeCVAddress", zeroKnowledgeCVAddress)

            sempahoreContract = await hre.ethers.getContractAt(
                "Semaphore",
                "0x4536F4cc7CE6c847d72fd54Ee84a8B2045d9CE8e",
                signer
            )
        } catch (error) {
            console.error("Deployment failed:", error)
        }
    })
    describe("Deployment", function () {
        // it("zkCV is deployed", async () => {
        //     await expect(zeroKnowledgeCV.createGroup(1)).emit(sempahoreContract, "GroupCreated")
        // })
        // it("Add new applicant", async () => {
        //     await zeroKnowledgeCV.createGroup(1)
        //     await expect(zeroKnowledgeCV.connect(deployer).joinGroup(1, identity.commitment)).emit(
        //         sempahoreContract,
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
            const groupId = 1
            // await expect(zeroKnowledgeCV.connect(deployer).createGroup(1, "Boss")).emit(
            //     sempahoreContract,
            //     "GroupCreated"
            // )

            console.log("got here")

            await zeroKnowledgeCV.joinGroup(groupId, identity.commitment)

            console.log("got here 2", identity.commitment)
            const semaphoreEthers = new SemaphoreEthers(
                "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP",
                {
                    address: sempahoreContract.address,
                    startBlock: 0,
                }
            )
            const groupIds = await semaphoreEthers.getGroupIds()

            const groupChain = await semaphoreEthers.getGroup(groupId.toString())

            const members = await semaphoreEthers.getGroupMembers(groupId.toString())

            const group = new Group(groupId, 20, members)

            const nullifierHash = 123456789

            const groupRoot = group.root

            // Adjust the relative path as necessary based on your project structure
            const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
            const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")

            console.log("signal", signal)
            const fullProof = await generateProof(identity, group, nullifierHash, signal, {
                zkeyFilePath,
                wasmFilePath,
            })

            console.log(
                groupId,
                signal,
                groupRoot,
                fullProof.nullifierHash,
                fullProof.proof,
                fullProof.externalNullifier
            )
            console.log("submitting CV")
            //call submit application
            await expect(
                zeroKnowledgeCV.submitCV(
                    groupId,
                    signal,
                    groupRoot,
                    fullProof.nullifierHash,
                    fullProof.proof,
                    fullProof.externalNullifier
                )
            ).emit(zeroKnowledgeCV, "CVSubmitted")

            const verifiedProofs = await semaphoreEthers.getGroupVerifiedProofs(groupId.toString())
            console.log(verifiedProofs)
        })
    })
})
