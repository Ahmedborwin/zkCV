import React, { useState } from "react";

// Components
import TestAttestation from "../components/TestAttestation";
import Roadmap from "../components/Roadmap";
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";
import SubmitButton from "../components/common/Button/SubmitButton";

// Hooks
import useRole from "../hooks/useRole";

// Utils
import { isEmployer } from "../utils/helpers/roles";

const HomePage = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const stages = ["Screening", "First Interview", "Technical Interview", "Discuss Offer", "Final Decision"];

  const handlePreviousStage = () => setCurrentStage(prevStage => Math.max(0, prevStage - 1));
  const handleNextStage = () => setCurrentStage(prevStage => Math.min(stages.length - 1, prevStage + 1));
  const role = useRole();

  return (
    <FadeIn>
      <BentoGrid>
        <Roadmap stages={stages} currentStage={currentStage} />

        {isEmployer(role) &&
          <div className="flex items-center justify-center space-x-4 mt-4">
            <SubmitButton
              onClick={handlePreviousStage}
              disabled={currentStage === 0}
            >
              PREVIOUS
            </SubmitButton>

            <SubmitButton
              onClick={handleNextStage}
              disabled={currentStage === stages.length - 1}
            >
              NEXT
            </SubmitButton>
          </div>
        }
      </BentoGrid>

      <BentoGrid>
        <TestAttestation />
      </BentoGrid>
    </FadeIn>
  );
}

export default HomePage;
