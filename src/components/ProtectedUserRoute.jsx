import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ProtectedUserRoutes = ({ children, redirectTo = "/login" }) => {
	const { currentUser } = useAuthContext();

	return currentUser ? children : <Navigate to={redirectTo} />;
};

export default ProtectedUserRoutes;
