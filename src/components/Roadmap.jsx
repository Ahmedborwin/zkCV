import React from 'react';
import styled, { keyframes } from 'styled-components';

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
    gap: 20px;
    margin: 20px 0;

    @media (max-width: 768px) {
    gap: 10px; // Reduce gap on smaller screens
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

const Roadmap = ({ stages, currentStage }) => {
    return (
        <div className="mx-8">
            <h3 className="text-center text-xl font-bold mb-8">
                Recruitment Progress
            </h3>

            <RoadmapContainer>
                {stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center mx-4">
                        <RoadmapStage
                            isCurrent={index === currentStage}
                            isPrevious={index < currentStage}
                        >
                            {index + 1}
                        </RoadmapStage>

                        <div className="mt-2 text-sm">{stage}</div>
                    </div>
                ))}
            </RoadmapContainer>
        </div>
    );
};

export default Roadmap;
