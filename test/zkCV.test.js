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

        try {
            const contractsDeployed = await main()
            zeroKnowledgeCV = contractsDeployed.zeroKnowledgeCV
            sempahoreContract = contractsDeployed.semaphore
            zeroKnowledgeCVAddress = zeroKnowledgeCV.address
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
            const groupId = 300
            await expect(zeroKnowledgeCV.connect(deployer).createGroup(1, "Boss")).emit(
                sempahoreContract,
                "GroupCreated"
            )

            console.log("got here")

            await zeroKnowledgeCV.joinGroup(groupId, identity.commitment)

            console.log("got here 2")
            const semaphoreEthers = new SemaphoreEthers("http://127.0.0.1:8545", {
                address: sempahoreContract.address,
                startBlock: 0,
            })
            const groupIds = await semaphoreEthers.getGroupIds()

            const groupChain = await semaphoreEthers.getGroup(groupId.toString())

            const members = await semaphoreEthers.getGroupMembers(groupId.toString())

            const group = new Group(groupId, 20, members)

            const nullifierHash = 123456789

            const groupRoot = groupChain.merkleTree.root

            // Adjust the relative path as necessary based on your project structure
            const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
            const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")

            const fullProof = await generateProof(identity, group, nullifierHash, signal, {
                zkeyFilePath,
                wasmFilePath,
            })

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
