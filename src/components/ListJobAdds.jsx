import React from "react"

// Components
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer"
import BentoGrid from "./common/Effects/BentoGrid"
import Roadmap from "./Roadmap";

// Redux
import { useSelector } from "react-redux"
//store
import { selectGroups, selectGroupId } from "../store/selectors"
import useSemaphore from "../hooks/useSemaphore";


const ListJobAdds = () => {
    const vacancies = useSelector(selectGroupId)
    const groups = useSelector(selectGroups)

    const {
        users,
        feedback,
        refreshUsers,
        addUser,
        refreshFeedback,
        addFeedback
    } = useSemaphore();

    return (
        <SemaphoreContainer
            title={`Number of vacancies: ${vacancies}`}
            subTitle={`Vacancies`}
        >
            {groups.map(vacancy =>
                <BentoGrid>
                    <Roadmap />
                    <div>
                        Title: {vacancy.title.toUpperCase()}
                    </div>
                    <div>
                        Experience: {vacancy.experience}
                    </div>
                    {/* <div>Proof: {refreshFeedback(vacancy.id)}</div> */}
                    {/* <div>CV2</div> */}
                </BentoGrid>
            )}
        </SemaphoreContainer>
    )
}

export default ListJobAdds
