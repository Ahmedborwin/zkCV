import React from "react";

// Redux 
import { useSelector } from "react-redux";

// Store
import { selectGroupId, selectGroups } from "../store/selectors";

const ListJobAdds = () => {
    const groupId = useSelector(selectGroupId);
    const groups = useSelector(selectGroups);

    return (
        <div>
            Number of applications: {groupId}
        </div>
    )
}

export default ListJobAdds;