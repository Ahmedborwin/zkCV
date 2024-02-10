import React, { useState, useEffect } from 'react';
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from '../components/common/Effects/FadeIn';

const EmployeePage = () => {
    const [name, setName] = useState("John Doe");
    const [position, setPosition] = useState("Software Developer");
    const [skills, setSkills] = useState(["React", "Solidity", "JavaScript"]);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        setAvatarUrl(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&color=7F9CF5&background=EBF4FF`);
    }, [name]);

    return (
        <FadeIn>
            <BentoGrid>
                <div className="flex flex-col items-center gap-6 bg-[#0369a1] p-8 rounded-xl shadow-xl">
                    <img src={avatarUrl} alt="Avatar" className="w-40 h-40 rounded-full border-4 border-white shadow" />

                    <div className="w-full">
                        <label className="block mb-2 text-sm font-bold text-white">Identity</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full py-2 px-4 rounded-lg bg-[#ffffff20] text-white placeholder-[#e0e7ff] focus:ring-4 focus:ring-[#bfdbfe] shadow-inner" />
                    </div>

                    <div className="w-full">
                        <label className="block mb-2 text-sm font-bold text-white">Position</label>
                        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full py-2 px-4 rounded-lg bg-[#ffffff20] text-white placeholder-[#e0e7ff] focus:ring-4 focus:ring-[#bfdbfe] shadow-inner" />
                    </div>

                    <div className="w-full">
                        <label className="block mb-2 text-sm font-bold text-white">Skills</label>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-[#ffffff40] text-white shadow">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </BentoGrid>
        </FadeIn>
    );
};

export default EmployeePage;
