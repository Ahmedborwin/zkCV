import { EAS } from "@ethereum-attestation-service/eas-sdk"
import useWalletConnected from "../hooks/useAccount"

//hooks

const useEASSDK = () => {
    const { accountDetails, chain } = useWalletConnected()
    //TODO
    //find Contract address for other chains and make this dynamic
    const EASContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a" // Scroll Sepolia v0.26

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress)

    eas.connect(accountDetails.signer)

    return { eas }
}

export default useEASSDK
