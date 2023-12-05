import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context/authContext.";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export const ProtectedUserPages = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export const HigherResponsibilty = ({ role }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const decodedToken = jwtDecode(token);
  const responsibilities = [
    decodedToken.is_admin && "admin",
    decodedToken.is_staff && "staff",
    decodedToken.is_ccare && "customerCare",
  ];
  if (token && isAuthenticated && responsibilities.includes(role)) {
    console.log(isAuthenticated);
    return <Outlet />;
  } else if (token && isAuthenticated) {
    console.log(isAuthenticated);
    toast.error("permission denied", {
      theme: "dark",
    });
  } else {
    return <Navigate to={"/login"} />;
  }
};
