import React from "react";

// Redux 
import { useSelector } from "react-redux";

// Store
import { selectGroupId } from "../store/selectors";

const ListJobAdds = () => {
    const groupId = useSelector(selectGroupId);
    return (
        <div>
            Number of applications: {groupId}
        </div>
    )
}

export default ListJobAdds;