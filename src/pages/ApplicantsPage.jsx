import React from 'react';

// Components
import BentoGrid from "../components/common/Effects/BentoGrid";
import CVCard from '../components/CVCard';
import FadeIn from '../components/common/Effects/FadeIn';

// Utils
import { UI_AVATARS } from '../utils/constants';

const ApplicantsPage = () => {
    const cvs = [
        { name: "Jane Doe", position: "Web Developer", skills: ["HTML", "CSS", "JavaScript"], avatarUrl: `${UI_AVATARS}/?name=Jane+Doe&background=random` },
        { name: "John Smith", position: "Backend Developer", skills: ["Node.js", "Express", "MongoDB"], avatarUrl: `${UI_AVATARS}/?name=John+Smith&background=random` },
        { name: "Alice Johnson", position: "UI/UX Designer", skills: ["Figma", "Sketch", "Adobe XD"], avatarUrl: `${UI_AVATARS}/?name=Alice+Johnson&background=random` },
        { name: "Mark Brown", position: "Project Manager", skills: ["Agile Methodologies", "Scrum", "Team Leadership"], avatarUrl: `${UI_AVATARS}/?name=Mark+Brown&background=random` },
        { name: "Emily White", position: "Data Scientist", skills: ["Python", "R", "Machine Learning"], avatarUrl: `${UI_AVATARS}/?name=Emily+White&background=random` },
        // Add more CVs if needed
    ];

    return (
        <FadeIn>
            <BentoGrid>
                <div className="flex flex-wrap justify-center gap-4">
                    {cvs.map((cv, index) => (
                        <CVCard key={index} {...cv} />
                    ))}
                </div>
            </BentoGrid>
        </FadeIn>
    );
};

export default ApplicantsPage;
