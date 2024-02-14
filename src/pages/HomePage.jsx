import React from "react";

// Components
import TestAttestation from "../components/TestAttestation";
import Roadmap from "../components/Roadmap";
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";
import CreateIdentity from "../components/Identity";
import JoinGroups from "../components/JoinGroups";
import Schema from "../components/Schema";
import Attestation from "../components/Attestation";

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

      <BentoGrid>
        <Schema />
      </BentoGrid>

      <BentoGrid>
        <Attestation />
      </BentoGrid>
    </FadeIn>
  );
}

export default HomePage;
