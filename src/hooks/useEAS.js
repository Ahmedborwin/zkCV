import { EAS } from "@ethereum-attestation-service/eas-sdk"
import useWalletConnected from "../hooks/useAccount"
import EASAddressList from "../config/EASAddresses.json"
//hooks

const useEASSDK = () => {
    const { accountDetails, chain } = useWalletConnected()

    const EASContractAddress = EASAddressList[chain?.id]

    // Initialize the sdk with the address of the EAS Schema contract address
    if (EASContractAddress) {
        const eas = new EAS(EASContractAddress)

        eas?.connect(accountDetails.signer)

        return { eas }
    } else {
        return {}
    }
}

export default useEASSDK
