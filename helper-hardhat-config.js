import { scrollSepolia } from "wagmi/dist/chains";

const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
  11155111: {
    name: "sepolia",
  },
  80001: {
    name: "polygonMumbai",
  },
  534351: {
    name: "scrollSepolia",
  },
};

const DECIMALS = "18";
const INITIAL_PRICE = "200000000000000000000";
const developmentChains = ["hardhat", "localhost", "scrollSepolia"];

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_PRICE,
};
