import { mainnet, polygon, hardhat, sepolia, scrollSepolia, scrollTestnet } from "wagmi/chains"
import { configureChains, createConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { getParticleNetwork, getPopularWallets } from "../../../particle.config"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"

const createConnectors = (wallets) => {
    return connectorsForWallets(wallets)
}

export const configureApp = () => {
    const chainsConfig = [mainnet, polygon, hardhat, sepolia, scrollSepolia, scrollTestnet]
    const { chains, publicClient, webSocketPublicClient } = configureChains(chainsConfig, [
        publicProvider(),
    ])

    const particleNetwork = getParticleNetwork()
    const popularWallets = getPopularWallets(chains, particleNetwork)
    const connectors = createConnectors(popularWallets)

    const wagmiClient = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
        webSocketPublicClient,
    })

    return { chains, wagmiClient }
}
