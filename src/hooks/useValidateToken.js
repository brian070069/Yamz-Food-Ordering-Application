import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../context/authContext.";
import { CartContext } from "../context/CartContext";
import { ACTION } from "../Pages/Home/HomeReducer";
import axios from "axios";
import { userUrl } from "../services/BaseUrls";
import { getToken } from "../libs/getToken";

export const useValidateToken = () => {
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [, dispatch] = useContext(CartContext);

  const isTokenValid = async () => {
    const token = getToken("token");

    if (token) {
      try {
        await axios.get(userUrl + "check-token/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.clear();
        dispatch({ type: ACTION.GETINITIALSTATE });
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    isTokenValid();
  }, []);
};
