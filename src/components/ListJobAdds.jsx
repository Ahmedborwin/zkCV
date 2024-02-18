import React from "react";

// Components
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";
import Roadmap from "./Roadmap";
import ShowCV from "./ShowCV"

// Icons
import CVIcon from "../assets/cv-icon.jpg";

// Redux
import { useSelector } from "react-redux";

// Store
import { selectGroups, selectGroupId } from "../store/selectors";

const ListJobAdds = () => {
    const vacancies = useSelector(selectGroupId);
    const groups = useSelector(selectGroups);

    return (
        <SemaphoreContainer title={`Number of vacancies: ${vacancies}`}>
            {groups.length === 0 &&
                <div className="text-center">Loading Data ...</div>
            }
            {groups.map((vacancy, index) => (
                <div key={index} className="my-4 bg-gray-800 p-5 rounded-lg shadow-lg">

                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-300">Title: {vacancy.title.toUpperCase()}</h2>
                        <p className="text-md mt-1 text-gray-500">Experience: {vacancy.experience}</p>
                    </div>

                    {/* Applications Section */}
                    <ShowCV groupId={vacancy["id"]} />

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
