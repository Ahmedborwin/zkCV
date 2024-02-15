import React from "react";

// Components
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";
import CreateIdentity from "../components/Identity";
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer";

const HomePage = () => {
  return (
    <FadeIn>
      <BentoGrid>
        <SemaphoreContainer
          title="Hello there!"
          subTitle="YOU ARE AN #YOURROLE"
        />
      </BentoGrid>

      <BentoGrid>
        <CreateIdentity />
      </BentoGrid>
    </FadeIn>
  );
}

export default HomePage;
