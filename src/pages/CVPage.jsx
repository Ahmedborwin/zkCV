import React, { useState, useEffect } from 'react';

// Components
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from '../components/common/Effects/FadeIn';
import SubmitButton from '../components/common/Button/SubmitButton';
import FormField from '../components/common/Form/FormField';

// Utils
import { UI_AVATARS } from '../utils/constants';

const CVPage = () => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("John Doe");
    const [position, setPosition] = useState("Software Developer");
    const [skills, setSkills] = useState(["React", "Solidity", "JavaScript"]);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        setAvatarUrl(`${UI_AVATARS}/?name=${encodeURIComponent(name)}&color=7F9CF5&background=EBF4FF`);
    }, [name]);

    return (
        <FadeIn>
            <BentoGrid>
                <div className="flex flex-col items-center gap-6 bg-[#0369a1] p-8 rounded-xl shadow-xl">
                    <img src={avatarUrl} alt="Avatar" className="w-40 h-40 rounded-full border-4 border-white shadow" />

                    <FormField value={name} onChange={(e) => setName(e.target.value)}>
                        Identity
                    </FormField>

                    <FormField value={position} onChange={(e) => setPosition(e.target.value)}>
                        Position
                    </FormField>

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

                    {!editMode &&
                        <SubmitButton onClick={() => setEditMode(true)}>
                            EDIT
                        </SubmitButton>}

                    {editMode &&
                        <SubmitButton onClick={() => setEditMode(false)}>
                            SAVE
                        </SubmitButton>}
                </div>
            </BentoGrid>
        </FadeIn>
    );
};

export default CVPage;
