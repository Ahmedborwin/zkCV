import React from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import CreateIdentity from "../components/Identity"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"

// Hooks
import useRole from "../hooks/useRole"
import TestAttestation from "../components/TestAttestation"
import Attestation from "../components/Attestation"
import Schema from "../components/Schema"

const HomePage = () => {
    const role = useRole() || ""
    return (
        <FadeIn>
            <BentoGrid>
                <SemaphoreContainer
                    title="Hello there!"
                    subTitle={`You are an ${role.toUpperCase()}`}
                />
            </BentoGrid>

            <BentoGrid>
                <CreateIdentity />
            </BentoGrid>
            <BentoGrid>
                <Schema />
                <Attestation />
            </BentoGrid>
        </FadeIn>
    )
}

export default HomePage
