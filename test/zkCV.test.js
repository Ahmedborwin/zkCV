// const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect } = require("chai")
const { main } = require("../scripts/deploy")
const { Identity } = require("@semaphore-protocol/identity")
const { Group } = require("@semaphore-protocol/group")
const { generateProof, verifyProof } = require("@semaphore-protocol/proof")
const path = require("path")
const hre = require("hardhat")
require("../snark-artifacts/20/semaphore.json")

describe("zkCV", function () {
    // TO DO - create identity commitment

    let employer, deployer, zeroKnowledgeCV, semaphoreVerifierAddress

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
            semaphoreVerifierAddress = contractsDeployed.semaphoreVerifierAddress
            // Additional logic using deployed contract addresses
        } catch (error) {
            console.error("Deployment failed:", error)
        }
    })
    describe("Deployment", function () {
        it("zkCV is deployed", async () => {
            await expect(zeroKnowledgeCV.createEntity(1, deployer.address, 20)).emit(
                zeroKnowledgeCV,
                "EntityCreated"
            )
        })
        it("Add new applicant", async () => {
            await zeroKnowledgeCV.createEntity(1, deployer.address, 20)
            await expect(
                zeroKnowledgeCV.connect(deployer).addApplicant(1, identity.commitment)
            ).emit(zeroKnowledgeCV, "MemberAdded")
        })
        it("submit application (using group library)", async () => {
            const group = new Group(1, 20)
            group.addMember(identity.commitment)

            // Adjust the relative path as necessary based on your project structure
            const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
            const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")
            console.log(wasmFilePath) // Log the resolved path to debug

            const nullifierHash = 123456789

            const fullProof = await generateProof(identity, group, nullifierHash, signal, {
                zkeyFilePath,
                wasmFilePath,
            })

            const proofBool = await verifyProof(fullProof, 20)

            expect(proofBool).equal(true)
        })
        it("submit application", async () => {
            const groupId = 1
            await zeroKnowledgeCV.createEntity(groupId, deployer.address, 20)
            await zeroKnowledgeCV.connect(deployer).addApplicant(groupId, identity.commitment)

            const groupRoot = await zeroKnowledgeCV._getMerkleTreeRoot(groupId)

            // Adjust the relative path as necessary based on your project structure
            const wasmFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.wasm")
            const zkeyFilePath = path.resolve(__dirname, "../snark-artifacts/20/semaphore.zkey")

            const fullProof = await generateProof(
                identity.commitment,
                { depth: 20 },
                groupRoot,
                signal,
                {
                    zkeyFilePath,
                    wasmFilePath,
                }
            )

            //call submit application
            await expect(
                zeroKnowledgeCV.submitApplication(signal, groupRoot, groupId, fullProof.proof)
            ).emit(zeroKnowledgeCV, ApplicationSubmitted)
        })
    })
})
