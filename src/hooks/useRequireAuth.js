import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthenticationContext } from "../context/authContext.";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getToken } from "../libs/getToken";
import { Toast } from "../services/ToasterProvider";

export const useRequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (isAuthenticated) {
      return;
    }
    navigate("/login", { replace: true });
  }, []);
};

export const useHasHigherResponsibility = (role) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const token = getToken("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const decodedToken = jwtDecode(token);
  const responsibilities = [
    decodedToken.is_admin && "admin",
    decodedToken.is_staff && "staff",
    decodedToken.is_ccare && "customerCare",
  ];

  useLayoutEffect(() => {
    if (token && isAuthenticated && responsibilities.includes(role)) {
      return;
    }

    if (token && isAuthenticated) {
      Toast.error("permission denied");
      navigate("/", { replace: true });
      return;
    }
  });
};
