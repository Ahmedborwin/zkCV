// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"
import Roadmap from "../components/Roadmap"
import SubmitButton from "../components/common/Button/SubmitButton"
import { SemaphoreEthers } from "@semaphore-protocol/data"
import { ethers } from "ethers"
import SempaphoreAddressFile from "../config/semaphore_address.json"

import { Buffer } from "buffer"
window.Buffer = Buffer

// Redux
import { useDispatch, useSelector } from "react-redux"

// Store
import {
    selectProvider,
    selectZKCV,
    selectGroupId,
    selectGroups,
    selectChainId,
} from "../store/selectors"
import { joinGroup, submitApplication } from "../store/interactions"
import { Group } from "@semaphore-protocol/group"
// Semaphore
import { Identity } from "@semaphore-protocol/identity"
// Hooks
import useIdentity from "../hooks/useIdentity"
import useSemaphoreProofs from "../hooks/useSemaphoreProofs"
import useAttestation from "../hooks/useAttestation"
import useAccount from "../hooks/useAccount"

const JobsPage = () => {
    const dispatch = useDispatch()

    const chainId = useSelector(selectChainId)
    const { accountDetails } = useAccount()
    const provider = useSelector(selectProvider)
    const zkCV = useSelector(selectZKCV)
    const vacancies = useSelector(selectGroupId)
    const groups = useSelector(selectGroups)

    const { identity } = useIdentity()

    const handleSubmitApplication = async (groupId) => {
        let fullProof
        const signal = localStorage.getItem("CVHash")
        const identityCommitment = identity.commitment.toString()

        //TODO - make sure join group is called before calling api - has.wait is not working!!!
        const hash = await joinGroup(provider, zkCV, identityCommitment, groupId, dispatch)
        await hash.wait(3)

        const semaphoreEthers = new SemaphoreEthers(
            "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP",
            {
                address: SempaphoreAddressFile[chainId],
                startBlock: 0,
            }
        )

        const groupChain = await semaphoreEthers.getGroup(groupId.toString())
        const groupRoot = groupChain.merkleTree.root

        try {
            const requestBody = JSON.stringify({
                identityPassword: accountDetails.address.toString(),
                signal: signal,
                group: groupId,
                nullifier: accountDetails.address,
            })

            const response = await fetch("http://localhost:3000/api/generateProof", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: requestBody,
            })

            if (!response.ok) {
                throw new Error("Failed to generate proof", JSON.stringify(response))
            }

            const fullProof = await response.json()
            console.log("@@@@proof", fullProof)

            const txHash = await submitApplication(
                provider,
                zkCV,
                groupId,
                ethers.toBigInt(signal),
                groupRoot,
                fullProof.nullifierHash,
                fullProof.proof,
                fullProof.externalNullifier,
                dispatch
            )
            console.log("@@cv submitted - tx hash ", txHash)
        } catch (error) {
            console.error("Failed to generate and verify proof:", error)
        }
    }

    const getVerifiedProofs = async (groupId) => {
        // submit CV by calling
        const semaphoreEthers = new SemaphoreEthers(
            "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP",
            {
                address: "0x4536F4cc7CE6c847d72fd54Ee84a8B2045d9CE8e",
                startBlock: 0,
            }
        )

        const verifiedProofs = await semaphoreEthers.getGroupVerifiedProofs(groupId.toString())
        console.log(verifiedProofs)
    }

    const handleGenerateProof = async (groupId) => {
        let fullProof
        const signal = localStorage.getItem("CVHash")
        const identityCommitment = identity.commitment.toString()

        //TODO - make sure join group is called before calling api
        const hash = await joinGroup(provider, zkCV, identityCommitment, groupId, dispatch)
        await hash.wait(3)

        const semaphoreEthers = new SemaphoreEthers(
            "https://polygon-mumbai.g.alchemy.com/v2/zTPogX-iVpVC1-IGvBRCJYI6hX6DLNKP",
            {
                address: SempaphoreAddressFile[chainId],
                startBlock: 0,
            }
        )

        const groupChain = await semaphoreEthers.getGroup(groupId.toString())
        const groupRoot = groupChain.merkleTree.root

        try {
            const requestBody = JSON.stringify({
                identityPassword: accountDetails.address.toString(),
                signal: signal,
                group: groupId,
                nullifier: accountDetails.address,
            })

            const response = await fetch("http://localhost:3000/api/generateProof", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: requestBody,
            })

            if (!response.ok) {
                throw new Error("Failed to generate proof", JSON.stringify(response))
            }

            const fullProof = await response.json()
            console.log("@@@@proof", fullProof)

            const txHash = await submitApplication(
                provider,
                zkCV,
                groupId,
                ethers.toBigInt(signal),
                groupRoot,
                fullProof.nullifierHash,
                fullProof.proof,
                fullProof.externalNullifier,
                dispatch
            )
            console.log("@@cv submitted - tx hash ", txHash)
        } catch (error) {
            console.error("Failed to generate and verify proof:", error)
        }
    }

    const handleAttestToCV = async () => {
        const identity = new Identity("Secret")
        const identityCommitment = identity.commitment.toString()

        // get cvHash from storage
        const cvHash = localStorage.getItem("CVHash")
        useAttestation(cvHash, identityCommitment)
    }

    return (
        <FadeIn>
            <SemaphoreContainer title={`Number of vacancies: ${vacancies}`} subTitle={`Vacancies`}>
                {groups.map((vacancy) => (
                    <BentoGrid>
                        <Roadmap />
                        <div>Title: {vacancy.title.toUpperCase()}</div>
                        <div>Experience: {vacancy.experience}</div>
                        <SubmitButton onClick={() => handleSubmitApplication(vacancy.id)}>
                            Apply for job
                        </SubmitButton>
                        <SubmitButton onClick={() => getVerifiedProofs(vacancy.id)}>
                            verified Proofs
                        </SubmitButton>
                    </BentoGrid>
                ))}
            </SemaphoreContainer>
        </FadeIn>
    )
}

export default JobsPage
