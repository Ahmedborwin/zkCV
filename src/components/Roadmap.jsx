import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import SubmitButton from "../components/common/Button/SubmitButton";

// Hooks
import useRole from "../hooks/useRole";

// Utils
import { isEmployer } from "../utils/helpers/roles";

// Define keyframes for animations
const glow = keyframes`
    0%, 100% {
        background-color: #2563eb; // Blue color
        color: white;
        box-shadow: 0 0 8px #2563eb;
    }
    50% {
        background-color: #d1d5db; // Tailwind's gray-300
        color: #4b5563; // Tailwind's gray-600
        box-shadow: 0 0 8px #d1d5db;
    }
`;

// Styled component for the glowing effect
const RoadmapContainer = styled.div`
    display: flex;
    flex-wrap: wrap; // Allow items to wrap in smaller screens
    justify-content: space-between;
    gap: 10px;
    margin: 10px 0;

    @media (max-width: 768px) {
    gap: 5px; // Reduce gap on smaller screens
    }
`;

// Adjust the sizes for smaller screens
const StageCommonStyles = `
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    @media (max-width: 768px) {
    width: 30px; // Reduce size on smaller screens
    height: 30px;
    }
`;

// Apply common styles to stage components
const GlowingStage = styled.div`
    animation: ${glow} 2s infinite;
    ${StageCommonStyles}
`;

const PreviousStage = styled.div`
    background-color: #2563eb;
    ${StageCommonStyles}
`;

const UpcomingStage = styled.div`
    background-color: #d1d5db;
    ${StageCommonStyles}
`;

const RoadmapStage = ({ isCurrent, isPrevious, children }) => {
    if (isCurrent) {
        return <GlowingStage>{children}</GlowingStage>;
    } else if (isPrevious) {
        return <PreviousStage>{children}</PreviousStage>;
    } else {
        return <UpcomingStage>{children}</UpcomingStage>;
    }
};

const Roadmap = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const stages = ["Screening", "First Interview", "Technical Interview", "Discuss Offer", "Final Decision"];

    const handlePreviousStage = () => setCurrentStage(prevStage => Math.max(0, prevStage - 1));
    const handleNextStage = () => setCurrentStage(prevStage => Math.min(stages.length - 1, prevStage + 1));
    const role = useRole();

    return (
        <div className="">
            <div className="mx-2">
                <h3 className="text-lg font-semibold text-gray-300">
                    Roadmap:
                </h3>
                <RoadmapContainer>
                    {stages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center mx-2">
                            <RoadmapStage
                                isCurrent={index === currentStage}
                                isPrevious={index < currentStage}
                            >
                                {index + 1}
                            </RoadmapStage>

                            <div className="mt-2 text-xs">{stage}</div>
                        </div>
                    ))}
                </RoadmapContainer>
            </div>

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
        </div>
    );
};

export default Roadmap;
