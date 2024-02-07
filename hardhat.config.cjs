require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
// If not set, it uses the hardhat account 0 private key.
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.8",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
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
    scroll: {
      url: process.env.SCROLL_TESTNET_URL || "",
      accounts: [PRIVATE_KEY],
      chainId: 534351,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 500000,
      chainId: 43113,
      accounts: [PRIVATE_KEY],
    },
    AvalancheMainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 500000,
      chainId: 43114,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {},
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
};
