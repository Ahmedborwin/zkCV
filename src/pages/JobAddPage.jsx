// Components
import CreateJobAdd from "../components/CreateJobAdd";
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";

const JobAddPage = () => {
    return (
        <FadeIn>
            <BentoGrid>
                <CreateJobAdd />
            </BentoGrid>

            <BentoGrid>
                List Jobs
            </BentoGrid>
        </FadeIn>
    )
}

export default JobAddPage;