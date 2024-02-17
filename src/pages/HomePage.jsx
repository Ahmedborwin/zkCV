import React from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import CreateIdentity from "../components/Identity"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"

// Hooks
import useRole from "../hooks/useRole"
import GetAttestation from "../components/GetAttestation"
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
                <GetAttestation
                    groupId={"0x859802fe172d555556c6b5b8563719f4741bb979f5fb9fad0a4c64ab2b226e61"}
                />
            </BentoGrid>
        </FadeIn>
    )
}

export default HomePage
