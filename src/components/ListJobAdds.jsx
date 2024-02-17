import React from "react"

// Components
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer"
import BentoGrid from "./common/Effects/BentoGrid"
import Roadmap from "./Roadmap"
import ShowCV from "./ShowCV"

// Redux
import { useSelector } from "react-redux"
//store
import { selectGroups, selectGroupId } from "../store/selectors"

const ListJobAdds = () => {
    const vacancies = useSelector(selectGroupId)
    const groups = useSelector(selectGroups)

    return (
        <SemaphoreContainer title={`Number of vacancies: ${vacancies}`} subTitle={`Vacancies`}>
            {groups.map((vacancy) => (
                <BentoGrid>
                    {/* <Roadmap /> */}
                    <div>Title: {vacancy.title.toUpperCase()}</div>
                    <div>Experience: {vacancy.experience}</div>
                    <ShowCV groupId={vacancy["id"]} />
                </BentoGrid>
            ))}
        </SemaphoreContainer>
    )
}

export default ListJobAdds
