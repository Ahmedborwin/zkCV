import { useAccount as useWagmiAccount, useNetwork } from "wagmi"
import { useState, useEffect } from "react"
import { useSigner, useProvider } from "./useSigner&Provider" // Adjust the path as necessary

const useAccount = () => {
    const { chain } = useNetwork()
    const { address, isConnected } = useWagmiAccount()
    const signer = useSigner()
    const provider = useProvider()
    const [accountDetails, setAccountDetails] = useState({
        address: "",
        signer: null,
        provider: null,
    })

    useEffect(() => {
        if (isConnected) {
            setAccountDetails({ address, signer, provider })
        }
    }, [address, isConnected, signer, provider])

    return { accountDetails, chain }
}

export default useAccount
