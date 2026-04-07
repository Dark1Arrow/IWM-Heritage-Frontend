import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../../redux/constant";

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.profile )
    console.log(user)
    if (user?.accountType !== ACCOUNT_TYPE.ADMIN) {
        return <Navigate to="/dashboard/my-profile" />
    }
    return children
}

export default AdminRoute