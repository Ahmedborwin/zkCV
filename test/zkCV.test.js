const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect } = require("chai")
const { main } = require("../scripts/deploy")

describe("zkCV", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    beforeEach(async () => {
        try {
            const { zeroKnowledgeCV, semaphoreVerifierAddress } = await main()
            console.log(`Deployed ZeroKnowledgeCV address: ${zeroKnowledgeCV.target}`)
            // Additional logic using deployed contract addresses
        } catch (error) {
            console.error("Deployment failed:", error)
        }
    })
    describe("Deployment", function () {
        it("zkCV is deployed", async function () {})
    })
})
