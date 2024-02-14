import React from "react";

// Components
import TestAttestation from "../components/TestAttestation";
import Roadmap from "../components/Roadmap";
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";
import CreateIdentity from "../components/Identity";
import JoinGroups from "../components/JoinGroups";

const HomePage = () => {
  return (
    <FadeIn>
      <BentoGrid>
        <Roadmap />
      </BentoGrid>

      <BentoGrid>
        <CreateIdentity />
      </BentoGrid>

      <BentoGrid>
        <JoinGroups />
      </BentoGrid>

      <BentoGrid>
        <TestAttestation />
      </BentoGrid>
    </FadeIn>
  );
}

export default HomePage;
