import { FallbackProvider, JsonRpcProvider, BrowserProvider } from "ethers"
import { useEffect, useState } from "react"
import { usePublicClient, useWalletClient } from "wagmi"

function publicClientToProvider(publicClient) {
    const { chain, transport } = publicClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === "fallback")
        return new FallbackProvider(
            transport.transports.map(({ value }) => new JsonRpcProvider(value?.url, network))
        )
    return new providers.JsonRpcProvider(transport.url, network)
}

function walletClientToSigner(walletClient) {
    const { account, chain, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new BrowserProvider(transport, network)
    const signer = provider.getSigner(account.address)

    return signer
}

export function useSigner() {
    const { data: walletClient } = useWalletClient()

    const [signer, setSigner] = useState(undefined)
    useEffect(() => {
        async function getSigner() {
            if (!walletClient) return

            const tmpSigner = await walletClientToSigner(walletClient)

            setSigner(tmpSigner)
        }

        getSigner()
    }, [walletClient])

    return signer
}

export function useProvider() {
    const publicClient = usePublicClient()

    const [provider, setProvider] = useState(undefined)
    useEffect(() => {
        async function getProvider() {
            if (!publicClient) return

            const tmpProvider = publicClientToProvider(publicClient)

            setProvider(tmpProvider)
        }

        getProvider()
    }, [publicClient])
    return provider
}
