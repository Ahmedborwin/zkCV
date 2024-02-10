// CVCard.jsx
import React from 'react';

const CVCard = ({ name, position, skills, avatarUrl }) => {
    return (
        <div className="flex flex-col items-center gap-6 bg-gradient-to-r from-[#0369a1] to-[#2563eb] p-8 rounded-xl shadow-xl">
            <div className="flex items-center space-x-4">
                <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full" />
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-sm text-gray-900">{position}</div>
                </div>
            </div>
            <div className="mt-2">
                <div className="font-bold">Skills:</div>
                <ul className="list-disc list-inside text-sm">
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CVCard;
