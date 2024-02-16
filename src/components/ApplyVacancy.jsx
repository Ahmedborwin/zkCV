const useEASSDK = () => {
    const { accountDetails, chain } = useWalletConnected()

    const EASContractAddress = EASAddressList[chain.id]

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress)

    eas.connect(accountDetails.signer)

    return <div>APPLY HERE</div>
}

export default useEASSDK
