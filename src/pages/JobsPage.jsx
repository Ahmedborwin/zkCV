// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"
import Roadmap from "../components/Roadmap"
import SubmitButton from "../components/common/Button/SubmitButton"
import { SemaphoreEthers, getSupportedNetworks } from "@semaphore-protocol/data"
import { ethers } from "ethers"
import SempaphoreAddressFile from "../config/semaphore_address.json"

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

const JobsPage = () => {
    const dispatch = useDispatch()

    const { generateAndVerifyProof, proof, error } = useSemaphoreProofs()

    const chainId = useSelector(selectChainId)
    const zkCV = useSelector(selectZKCV)
    const vacancies = useSelector(selectGroupId)
    const groups = useSelector(selectGroups)

    // const { identity } = useIdentity()

    const handleSubmitApplication = async (groupId) => {
        const identity = new Identity("Secret")
        const identityCommitment = identity.commitment.toString()

        // get cvHash from storage
        const cvHash = localStorage.getItem("CVHash")

        // join group - call joinGroup from interactions
        // const hash = await joinGroup(provider, zkCV, identityCommitment, groupId, dispatch)

        const semaphoreEthers = new SemaphoreEthers("maticmum", {
            address: SempaphoreAddressFile[chainId],
            startBlock: 0,
        })

        const members = await semaphoreEthers.getGroupMembers(groupId.toString())

        const group = new Group(groupId, 20, members)

        const nullifierHash = 12345
        const signal = 1234567

        const fullProof = await generateAndVerifyProof(identity, group, nullifierHash, cvHash)

        console.log("@@@proof", fullProof)

        // Ensure this function call is awaited and encapsulated in a try-catch block
        // try {
        //     const nullifierHash = "12345"
        //     const signal = "1234567"

        //     const requestBody = JSON.stringify(
        //         {
        //             identity: identity,
        //             group: group,
        //             nullifierHash: nullifierHash,
        //             signal: signal,
        //         },
        //         replacer
        //     ) // Assuming 'replacer' is a function you've defined for handling serialization

        //     console.log("Sending request body:", requestBody)

        //     const response = await fetch("http://localhost:3000/api/generateProof", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },

        //         body: requestBody,
        //     })
        //     console.log("@@@ server call 1", response)
        //     if (!response.ok) {
        //         throw new Error("Failed to generate proof", JSON.stringify(response))
        //     }

        //     const fullProof = await response.json()
        //     console.log("@@@fullProof", fullProof)
        //     return fullProof
        // } catch (error) {
        //     console.error("Failed to generate and verify proof:", error)
        // }

        // // verify proof -
        // const merkleTreeRoot = ""
        // const nullifierHash = ""
        // const externalNullifier = ""
        // const proof = ""

        // // submit CV by calling
        // submitApplication(
        //     provider,
        //     zkCV,
        //     groupId,
        //     cvHash,
        //     merkleTreeRoot,
        //     nullifierHash,
        //     proof,
        //     externalNullifier,
        //     dispatch
        // )
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
                    </BentoGrid>
                ))}
            </SemaphoreContainer>
        </FadeIn>
    )
}

export default JobsPage
