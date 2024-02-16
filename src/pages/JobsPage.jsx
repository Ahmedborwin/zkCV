import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"

import { useAccount } from "wagmi"
// Redux
import { useDispatch, useSelector } from "react-redux"
//load zkcv
import { selectProvider, selectGroupId, selectZKCV } from "../store/selectors"
import { loadZKCV, loadProvider, loadNetwork, loadAccount } from "../store/interactions"

//load group

const JobsPage = () => {
    return (
        <FadeIn>
            <BentoGrid>List Jobs</BentoGrid>
        </FadeIn>
    )
}

export default JobsPage
