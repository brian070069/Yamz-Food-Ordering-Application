import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthenticationContext } from "../context/authContext.";
import { ACTION } from "../Pages/Home/HomeReducer";
import axios from "axios";
import { cartBaseUrl } from "../services/BaseUrls";
import { getToken } from "../libs/getToken";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//get cartItems for register user
export const useGetCartItems = () => {
  const [state, dispatch] = useContext(CartContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [isLoadingCart, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const getCartItems = async () => {
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
          cancelToken: cancelTokenSource.token,
        });
        const data = response.data[0];
        const subTotals = data.total;
        const cartId = data.cart_id;
        localStorage.setItem("cartId", cartId);

        // get cart items in database
        const response2 = await axios.get(
          cartBaseUrl + `cart/${cartId}/item/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            cancelToken: cancelTokenSource.token,
          }
        );

        const cartItems = response2.data;
        setIsLoading(false);
        dispatch({
          type: ACTION.GETCARTITEMS,
          payload: cartItems,
          subTotals: subTotals,
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setIsLoading(false);
        if (!err.response) {
          toast.error("failed to contact server please try again", {
            position: "top-center",
            theme: "dark",
          });
        } else if (err.request.status === 400) {
          toast.error("cart request failed", {
            position: "top-center",
            theme: "dark",
          });
        } else if (err.request.status === 401) {
          localStorage.clear();
        } else {
          toast.error("uknown error occurred please try again", {
            position: "top-center",
            theme: "dark",
          });
        }
      }
    };

    getCartItems();

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

  return { isLoadingCart };
};
