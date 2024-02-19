const networkConfig = {
    31337: {
        name: "localhost",
        rpcUrl: "",
    },
    11155111: {
        name: "sepolia",
        rpcUrl: "",
    },
    //Mumbai
    80001: {
        name: "Mumbai",
        rpcUrl: env.process.POLYGON_MUMBAI_RPC_URL,
    },
    //Scroll Sepolia
    51345: {
        name: "ScrollSepolia",
        rpcUrl: env.process.SCROLL_SEPOLIA_RPC,
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    INITIAL_PRICE,
}
