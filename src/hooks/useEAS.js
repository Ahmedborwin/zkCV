import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk"
import { ethers } from "hardhat"

const useEAS_SDK = () => {
    //TODO
    //find Contract address for other chains and make this dynamic
    const EASContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a" // Scroll Sepolia v0.26

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress)

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider("scrollSepolia")

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(provider)

    return { eas }
}

export default useEAS_SDK
