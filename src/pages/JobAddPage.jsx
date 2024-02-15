// Components
import CreateJobAdd from "../components/CreateJobAdd";
import ListJobAdds from "../components/ListJobAdds";
import BentoGrid from "../components/common/Effects/BentoGrid";
import FadeIn from "../components/common/Effects/FadeIn";

const JobAddPage = () => {
    return (
        <FadeIn>
            <BentoGrid>
                <CreateJobAdd />
            </BentoGrid>

            <BentoGrid>
                <ListJobAdds />
            </BentoGrid>
        </FadeIn>
    )
}

export default JobAddPage;