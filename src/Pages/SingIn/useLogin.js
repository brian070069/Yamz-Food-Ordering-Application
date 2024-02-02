import axios from "axios";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../context/authContext.";
import { useLocation, useNavigate } from "react-router-dom";
import { userUrl } from "../../services/BaseUrls";
import { Toast } from "../../services/ToasterProvider";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    let phoneNumber = values.phoneNumber;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+254" + phoneNumber.slice(1);
    }

    const userInfo = {
      phone_number: phoneNumber,
      password: values.password,
    };

    setLoading(true);
    try {
      const response = await axios.post(userUrl + "login/", userInfo, {
        headers: { "content-type": "application/json" },
      });
      const data = response.data;
      //succesful login
      const { access_token } = data;
      setLoading(false);
      Toast.success("logged in succesfully");

      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("token", access_token);
      setIsAuthenticated(true);
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      if (error.request.status === 404) {
        setWrongCredentialsError(true);
      } else if (!error.response) {
        Toast.error("failed to contact server please try again");
      } else {
        Toast.error("an error occured please try again");
      }
    }
  };

  return { loading, handleLogin, wrongCredentialsError };
};
