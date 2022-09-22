import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useGetDocument } from "../hooks/useGetDocument"

const RequireAuth = ({ children, redirectTo = "/login" }) => {
  const { currentUser } = useAuthContext();

  const { data: user } = useGetDocument('users', currentUser.uid)

  return user.admin ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
