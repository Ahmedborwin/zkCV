import React from "react";
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";
import Roadmap from "./Roadmap";
import CVIcon from "../assets/cv-icon.jpg";
import { useSelector } from "react-redux";
import { selectGroups, selectGroupId } from "../store/selectors";

const ListJobAdds = () => {
    const vacancies = useSelector(selectGroupId);
    const groups = useSelector(selectGroups);

    const CV_List = ['CV1', 'CV2', 'CV3']; // Adjust according to your actual data

    return (
        <SemaphoreContainer title={`Number of vacancies: ${vacancies}`}>
            {groups.map((vacancy, index) => (
                <div key={index} className="my-4 bg-gray-800 p-5 rounded-lg shadow-lg">

                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-300">Title: {vacancy.title.toUpperCase()}</h2>
                        <p className="text-md mt-1 text-gray-500">Experience: {vacancy.experience}</p>
                    </div>

                    {/* Applications Section */}
                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-300">Applications:</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {CV_List.map((cv, cvIndex) => (
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" key={cvIndex} className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out">
                                    <img src={CVIcon} alt="CV Icon" className="w-6 h-6 rounded-full" />
                                    {cv}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Roadmap Section */}
                    <div className="mt-4">
                        <Roadmap />
                    </div>
                </div>
            ))}
        </SemaphoreContainer>
    );
};

export default ListJobAdds;
