import React from "react"
import { useAccount } from "wagmi"
// Redux
import { useDispatch, useSelector } from "react-redux"
//store
import { selectGroups, selectGroupId, selectZKCV } from "../store/selectors"

const ListJobAdds = () => {
    const Vacancies = useSelector(selectGroupId)
    const groups = useSelector(selectGroups)
    const zkCV = useSelector(selectZKCV)

    const { isConnected } = useAccount()

    //TODO - how can i use the selectGrousp to deal with this??
    const handleVacancyDetails = async () => {
        //check if vacancy is live
        const isLive = await zkCV.vacancyIsLive(1)
        if (isLive) {
            const vancancy = await zkCV?.applicationMapping(1)
            const vacancyDetails = {
                Experience: vancancy[0],
                Title: vancancy[1],
            }
        }
    }

    // Trigger initial load or state update
    isConnected && handleVacancyDetails()

    return <div>Number of applications: {Vacancies}</div>
}

export default ListJobAdds
