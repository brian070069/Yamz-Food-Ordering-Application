import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthenticationContext } from "../context/authContext.";
import { ACTION } from "../Pages/Home/HomeReducer";
import axios from "axios";
import { cartBaseUrl } from "../services/BaseUrls";
import { getToken } from "../libs/getToken";
import { Toast } from "../services/ToasterProvider";
import { useNavigate } from "react-router-dom";

//get cartItems for register user
export const useGetCartItems = () => {
  const [state, dispatch] = useContext(CartContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [isLoadingCart, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const getCartItems = async (value) => {
    const token = getToken("token");

    if (!token) {
      localStorage.clear();
      setIsAuthenticated(false);
      return;
    }

    //  get CartId && subtotals
    try {
      setIsLoading(true);
      const response = await axios.get(cartBaseUrl + "cart/", {
        headers: { Authorization: `Bearer ${token}` },
        value,
      });
      const data = response.data[0];
      const subTotals = data.total;
      const cartId = data.cart_id;
      localStorage.setItem("cartId", cartId);

      // get cart items in database
      const response2 = await axios.get(cartBaseUrl + `cart/${cartId}/item/`, {
        headers: { Authorization: `Bearer ${token}` },
        value,
      });

      const cartItems = response2.data;
      setIsLoading(false);
      setHasError(false);
      dispatch({
        type: ACTION.GETCARTITEMS,
        payload: cartItems,
        subTotals: subTotals,
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      setHasError(true);
      setIsLoading(false);

      if (!err.response) {
        Toast.error("failed to contact server please try again");
      } else if (err.request.status === 400) {
        Toast.error("cart request failed");
      } else if (err.request.status === 401) {
        localStorage.clear();
      } else {
        Toast.error("uknown error occurred please try again");
      }
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getCartItems(cancelTokenSource);
    // Cleanup function
    return () => {
      try {
        // Cancel ongoing request
        cancelTokenSource.cancel("Request canceled by cleanup");
      } catch (err) {
        console.error("Error cancelling request:", err);
      }
    };
  }, []);

  return { isLoadingCart, hasError, getCartItems };
};
