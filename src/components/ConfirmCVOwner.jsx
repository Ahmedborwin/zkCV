import useAttestation from "../hooks/useAttestation"
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer"
import BentoGrid from "../components/common/Effects/BentoGrid"

import { useState, useEffect } from "react"

const ConfirmCVOwner = ({ UID }) => {
    // const { fetchAttestation, messages } = useAttestation()
    // const [attestation, setAttestation] = useState()
    // useEffect(() => {
    //     if (attestation) {
    //         console.log(attestation)
    //     }
    // }, [attestation])
    // useEffect(() => {
    //     if (UID) {
    //         const _attestion = fetchAttestation(UID)
    //         console.log(_attestion)
    //         setAttestation(_attestion)
    //     }
    // }, [UID])
    // return (
    //     <SemaphoreContainer title="Attestation" messages={attestation}>
    //         <div className="mt-4 p-4 bg-blue-100 rounded-lg">
    //             <p className="text-gray-800">
    //                 <span className="text-blue-700">{attestation}</span>
    //             </p>
    //         </div>
    //     </SemaphoreContainer>
    // )
}

export default ConfirmCVOwner
