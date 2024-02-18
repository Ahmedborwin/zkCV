
// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SemaphoreContainer from "../components/common/Container/Semaphore/SemaphoreContainer"
import Roadmap from "../components/Roadmap"
import SubmitButton from "../components/common/Button/SubmitButton"

// Redux
import { useDispatch, useSelector } from "react-redux"

// Store
import { selectProvider, selectZKCV, selectGroupId, selectGroups } from "../store/selectors"
import { joinGroup, submitApplication } from "../store/interactions"

// Hooks
import useIdentity from "../hooks/useIdentity"

//load group

const JobsPage = () => {
    const dispatch = useDispatch();

    const provider = useSelector(selectProvider);
    const zkCV = useSelector(selectZKCV);
    const vacancies = useSelector(selectGroupId);
    const groups = useSelector(selectGroups);

    const { identity } = useIdentity();

    const handleSubmitApplication = (groupId) => {
        const identityCommitment = identity.commitment.toString()

        // join group - call joinGroup from interactions
        joinGroup(
            provider,
            zkCV,
            identityCommitment,
            groupId,
            dispatch
        )

        // verify proof - 
        const merkleTreeRoot = ""
        const nullifierHash = ""
        const externalNullifier = ""
        const proof = ""

        // get cvHash from storage
        const cvHash = localStorage.getItem("CVHash")

        // submit CV by calling 
        submitApplication(
            provider,
            zkCV,
            groupId,
            cvHash,
            merkleTreeRoot,
            nullifierHash,
            proof,
            externalNullifier,
            dispatch
        )
    }

    return (
        <FadeIn>
            <BentoGrid>
                <SemaphoreContainer title={`Number of vacancies: ${vacancies}`} className="mt-4">
                    {groups.length === 0 &&
                        <div className="text-center">Loading Data ...</div>
                    }

                    {groups.map((vacancy, index) => (
                        <div key={index} className="my-4 bg-gray-800 p-5 rounded-lg shadow-lg">

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-300">Role: {vacancy.title.toUpperCase()}</h2>
                                <p className="text-md mt-1 text-gray-500">Experience: {vacancy.experience}</p>
                            </div>

                            {/* Roadmap Section */}
                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <Roadmap />
                            </div>

                            <div className="flex justify-center">
                                <SubmitButton onClick={() => handleSubmitApplication(vacancy.id)}>
                                    Apply for job
                                </SubmitButton>
                            </div>
                        </div>
                    ))}
                </SemaphoreContainer>
            </BentoGrid>
        </FadeIn>
    )
}

export default JobsPage
