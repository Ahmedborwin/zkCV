require("@nomicfoundation/hardhat-toolbox")
require("@semaphore-protocol/hardhat")
require("dotenv").config()

const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"
// If not set, it uses the hardhat account 0 private key.
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY || ""
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.23",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            chainId: 31337,
        },
        polygonMumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
        },
        scrollSepolia: {
            url: process.env.SCROLL_TESTNET_URL || "",
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            polygonMumbai: POLYGON_SCAN_API_KEY,
        },
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
}
