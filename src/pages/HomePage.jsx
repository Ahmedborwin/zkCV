import React from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import CreateIdentity from "../components/Identity"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"

// Hooks
import useRole from "../hooks/useRole"

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
        </FadeIn>
    )
}

export default HomePage
