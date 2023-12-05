import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../context/authContext.";
import { useLocation, useNavigate } from "react-router-dom";
import { userUrl } from "../../services/BaseUrls";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const userInfo = {
      phone_number: values.phoneNumber,
      password: values.password,
    };

    setLoading(true);
    try {
      const response = await axios.post(userUrl + "login/", userInfo, {
        headers: { "content-type": "application/json" },
      });
      const data = response.data;
      //succesful login
      const { acess_token } = data;
      setLoading(false);
      toast.success("logged in succesfully", {
        position: "top-center",
        theme: "dark",
      });
      setIsAuthenticated(true);
      navigate(from, { replace: true });
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("token", acess_token);
    } catch (error) {
      setLoading(false);
      if (error.request.status === 404) {
        setWrongCredentialsError(true);
      } else if (!error.response) {
        toast.error("failed to contact server please try again", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error("an error occured please try again", {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };

  return { loading, handleLogin, wrongCredentialsError };
};
