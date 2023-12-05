import { useContext, useEffect, useState } from "react";
import { ACTION } from "../Pages/Home/HomeReducer";
import { CartContext } from "../context/CartContext";
import { AuthenticationContext } from "../context/authContext.";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { cartBaseUrl } from "../services/BaseUrls";

export const useAddFoodToCart = (food_id) => {
  const [state, dispatch] = useContext(CartContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [isFoodInCart, setIsFoodInCart] = useState(false);
  const navigate = useNavigate();

  const addFoodToCart = async (foodId) => {
    const token = localStorage.getItem("token");

    //check  token
    if (!token) {
      dispatch({ type: ACTION.GETINITIALSTATE });
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    // add food to cart
    if (token) {
      //check if food is in cart
      const findFood = state.cartItems.find(
        (foodInCart) => foodInCart.food.food_id === foodId
      );
      if (findFood) {
        toast.error("item already in cart", {
          position: "top-center",
          theme: "dark",
        });
        return;
      }

      // adding food
      try {
        setLoading(true);
        // add food to cart
        const addedFoodResponse = await axios.post(
          cartBaseUrl + "cart/id/item/",
          { food_id, quantity: 1 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const addedFoodCartId = addedFoodResponse?.data?.add_to_cart_id;

        //get food added to cart
        const getaddedFooodInfo = await axios(
          cartBaseUrl + `cart/id/item/${addedFoodCartId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const food = getaddedFooodInfo?.data;

        // find cart info of user
        const getCartInfo = await axios(cartBaseUrl + "cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartInfo = getCartInfo.data;

        // extract total and update states
        const totalsInDataBase = cartInfo[0].total;
        dispatch({
          type: ACTION.UPDATECART,
          totals: totalsInDataBase,
          payload: food,
        });
        setLoading(false);
        toast.success("added successfully", {
          position: "top-center",
          theme: "dark",
        });
      } catch (err) {
        setLoading(false);
        if (err.request.status === 401) {
          navigate("/login");
          setIsAuthenticated(false);
          localStorage.clear();
          dispatch({ type: ACTION.GETINITIALSTATE });
        } else if (!err.response) {
          toast.error("failed to contact server,please try again", {
            theme: "dark",
          });
        } else if (err.request.status === 400) {
          toast.error("request failed please try again", {
            theme: "dark",
          });
        } else {
          toast.error("an error occured please try again", {
            theme: "dark",
          });
        }
      }
    }
  };

  useEffect(() => {
    const findFood = state.cartItems.find(
      (foodInCart) => foodInCart.food.food_id === food_id
    );

    if (findFood) {
      setIsFoodInCart(true);
      return;
    }
    setIsFoodInCart(false);
  }, [state.cartItems]);

  return { loading, isFoodInCart, addFoodToCart };
};
