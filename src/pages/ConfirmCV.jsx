import React from "react"
import { useState, useEffect } from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import useAttestation from "../hooks/useAttestation"

import { useSelector } from "react-redux"
// Store
import {
    selectProvider,
    selectZKCV,
    selectGroupId,
    selectGroups,
    selectChainId,
} from "../store/selectors"

import useAccount from "../hooks/useAccount"

const ConfirmCV = () => {
    const [userInput, setUserInput] = useState("")
    const [attestationUID, setAttestationUID] = useState("")
    const [chosenCVList, setChosenCVList] = useState("")
    const [submitTriggered, setSubmitTriggered] = useState(false)
    const [CVHash, setCVHash] = useState()
    const [attestor, setAttestor] = useState()
    const [chosenCVReady, setChosenCVReady] = useState(false)

    const provider = useSelector(selectProvider)
    const zkCV = useSelector(selectZKCV)
    const vacancies = useSelector(selectGroupId)
    const { accountDetails } = useAccount()

    const { fetchAttestation, messages } = useAttestation()

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleGetAttestation = async () => {
        const _attestion = await fetchAttestation(userInput)
        setAttestor(_attestion[7])
        setCVHash(_attestion[9])
        handleGetChosenCV()
    }

    const handleGetChosenCV = async () => {
        const signer = await provider.getSigner()
        const tx = await zkCV.connect(signer).getChosenCVHash(vacancies)
        setChosenCVList(tx)
        setChosenCVReady(true)
    }

    useEffect(() => {
        if (Object.keys(chosenCVList).length > 0) {
            console.log("here")
            if (
                JSON.stringify(chosenCVList).includes(`"${CVHash}"`) &&
                accountDetails.address == attestor
            ) {
                alert("Your CV was chosen!!!")
            } else {
                alert("Sorry - Another candidate was a better fit")
            }
            setChosenCVList([])
            setChosenCVReady(false)
        }
    }, [chosenCVReady])

    return (
        <FadeIn>
            <BentoGrid>
                <input
                    className="bg-gray-800"
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
