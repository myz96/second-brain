import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../Contexts/AuthProvider";

const PrivateRoutes = ({ redirectTo }) => {
  const { isLoadingUser, user } = useAuth();

//   console.log(user)

  if (isLoadingUser) return <p>Loading...</p>;
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;
