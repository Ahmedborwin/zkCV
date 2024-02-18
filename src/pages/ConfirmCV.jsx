import React from "react"
import { useState, useEffect } from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import useAttestation from "../hooks/useAttestation"

const ConfirmCV = () => {
    const [userInput, setUserInput] = useState("")
    const [attestationUID, setAttestationUID] = useState("")
    const [submitTriggered, setSubmitTriggered] = useState(false)
    const [attestation, setAttestation] = useState()

    const { fetchAttestation, messages } = useAttestation()

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleGetAttestation = () => {
        const _attestion = fetchAttestation(userInput)
        setAttestation(_attestion)
    }

    return (
        <FadeIn>
            <BentoGrid>
                <input
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter Attestation ID"
                />
                <button onClick={handleGetAttestation}>Submit</button>
                {submitTriggered && <ConfirmCVOwner UID={groupId} />}
            </BentoGrid>
        </FadeIn>
    )
}

export default ConfirmCV
