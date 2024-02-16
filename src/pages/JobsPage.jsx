
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
import useSemaphoreProofs from "../hooks/useSemaphoreProofs"

//load group

const JobsPage = () => {
    const dispatch = useDispatch();

    const { generateAndVerifyProof, proof, error } = useSemaphoreProofs();

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
                        <SubmitButton onClick={() => handleSubmitApplication(vacancy.id)}>
                            Apply for job
                        </SubmitButton>
                    </BentoGrid>
                )}
            </SemaphoreContainer>
        </FadeIn>
    )
}

export default JobsPage
