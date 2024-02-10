// EmployerPage.jsx
import React from 'react';
import BentoGrid from "../components/common/Effects/BentoGrid";
import CVCard from '../components/CVCard';
import FadeIn from '../components/common/Effects/FadeIn';

const EmployerPage = () => {
    const cvs = [
        { name: "Jane Doe", position: "Web Developer", skills: ["HTML", "CSS", "JavaScript"], avatarUrl: "https://ui-avatars.com/api/?name=Jane+Doe&background=random" },
        { name: "John Smith", position: "Backend Developer", skills: ["Node.js", "Express", "MongoDB"], avatarUrl: "https://ui-avatars.com/api/?name=John+Smith&background=random" },
        { name: "Alice Johnson", position: "UI/UX Designer", skills: ["Figma", "Sketch", "Adobe XD"], avatarUrl: "https://ui-avatars.com/api/?name=Alice+Johnson&background=random" },
        { name: "Mark Brown", position: "Project Manager", skills: ["Agile Methodologies", "Scrum", "Team Leadership"], avatarUrl: "https://ui-avatars.com/api/?name=Mark+Brown&background=random" },
        { name: "Emily White", position: "Data Scientist", skills: ["Python", "R", "Machine Learning"], avatarUrl: "https://ui-avatars.com/api/?name=Emily+White&background=random" },
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

export default EmployerPage;
