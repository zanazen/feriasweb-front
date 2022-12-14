import { useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!loggedUser) {
    return navigate("/");
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
