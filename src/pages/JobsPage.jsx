// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"
import Roadmap from "../components/Roadmap"
import SubmitButton from "../components/common/Button/SubmitButton"
import { SemaphoreEthers } from "@semaphore-protocol/data"
import { ethers } from "ethers"
import SempaphoreAddressFile from "../config/semaphore_address.json"
import { useState, useEffect } from "react"

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

// Hooks
import useIdentity from "../hooks/useIdentity"
import useAttestation from "../hooks/useAttestation"
import useAccount from "../hooks/useAccount"

const JobsPage = () => {
    const [attestReady, setAttestReady] = useState(false)
    const dispatch = useDispatch()
    const { attestToSchema } = useAttestation()

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

        // //TODO - make sure join group is called before calling api - has.wait is not working!!!
        const hash = await joinGroup(provider, zkCV, identityCommitment, groupId, dispatch)

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

            setAttestReady(true)
        } catch (error) {
            console.error("Failed to generate and verify proof:", error)
        }
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

            await submitApplication(
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
        } catch (error) {
            console.error("Failed to generate and verify proof:", error)
        }
    }

    useEffect(() => {
        if (attestReady) {
            const cvHash = localStorage.getItem("CVHash")
            const identityCommitment = identity.commitment.toString()
            attestToSchema(cvHash, identityCommitment, accountDetails.address.toString())
            setAttestReady(false)
        }
    }, [attestReady])

    return (
        <FadeIn>
            <BentoGrid>
                <SemaphoreContainer title={`Number of vacancies: ${vacancies}`} className="mt-4">
                    {groups.length === 0 &&
                        <div className="text-center">Loading Data ...</div>
                    }

                    {groups.map((vacancy, index) => (
                        <div key={index} className="my-4 bg-gray-800 p-5 rounded-lg shadow-lg">

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-300">Role: {vacancy.title.toUpperCase()}</h2>
                                <p className="text-md mt-1 text-gray-500">Experience: {vacancy.experience}</p>
                            </div>

                            {/* Roadmap Section */}
                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <Roadmap />
                            </div>

                            <div className="flex justify-center">
                                <SubmitButton onClick={() => handleSubmitApplication(vacancy.id)}>
                                    Apply for job
                                </SubmitButton>
                            </div>
                        </div>
                    ))}
                </SemaphoreContainer>
            </BentoGrid>
        </FadeIn>
    )
}

export default JobsPage
