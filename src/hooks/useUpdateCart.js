import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthenticationContext } from "../context/authContext.";
import { ACTION } from "../Pages/Home/HomeReducer";
// import { useClearCartError } from "./useClearCartError";
import axios from "axios";
import { cartBaseUrl } from "../services/BaseUrls";

// increase or decrease food quantity
export const useUpdateFoodQuantity = (food_id) => {
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [state, dispatch] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [updateCartErrorMessage, setUpdateCartErrorMessage] = useState("");
  const navigate = useNavigate();
  const findFood = state.cartItems.find(
    (food) => food.food.food_id === food_id
  );

  const updateFoodQuanityInCart = async (operation) => {
    //find food to update
    const food = state.cartItems.find((food) => food.food.food_id === food_id);
    let updateFoodQuantity = food.quantity;
    const token = localStorage.getItem("token");

    //check for available token
    if (!token) {
      navigate("/login");
      localStorage.clear();
      dispatch({ type: ACTION.GETINITIALSTATE });
      return;
    }

    // check for the operation to perform
    if (operation === "addition") {
      ++updateFoodQuantity;
    }
    if (operation === "subtraction") {
      if (updateFoodQuantity <= 1) {
        return;
      }
      --updateFoodQuantity;
    }

    //update food quantity
    try {
      setLoading(true);
      await axios.patch(
        cartBaseUrl + `cart/id/item/${food.add_to_cart_id}/`,
        { quantity: updateFoodQuantity },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update states
      if (operation === "addition") {
        dispatch({
          type: ACTION.UPATESUBTOTALS,
          operation: "increment",
          payload: food.food.price,
          foodId: food_id,
        });
        setLoading(false);
      } else {
        dispatch({
          type: ACTION.UPATESUBTOTALS,
          operation: "decrement",
          payload: food.food.price,
          foodId: food_id,
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.request.status === 401) {
        navigate("/login");
        localStorage.clear();
        setIsAuthenticated(false);
        dispatch({ type: ACTION.GETINITIALSTATE });
      } else if (!err.response) {
        setUpdateCartErrorMessage("failed to contact the server");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      } else if (err.request.status === 400) {
        setUpdateCartErrorMessage("request failed,try again");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      } else {
        setUpdateCartErrorMessage("an error occured please try again");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      }
    }
  };

  // useClearCartError();

  return { loading, setLoading, findFood, updateFoodQuanityInCart };
};

// delete food from cart
export const useDeleteFood = (food_id) => {
  const [state, dispatch] = useContext(CartContext);
  const [deleteFoodloader, setDeleteFoodLoader] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [updateCartErrorMessage, setUpdateCartErrorMessage] = useState("");
  const navigate = useNavigate();

  const deleteFood = async () => {
    const food = state.cartItems.find((food) => food.food.food_id === food_id);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setDeleteFoodLoader(true);
      const response = await axios.delete(
        cartBaseUrl + `cart/id/item/${food.add_to_cart_id}/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const total = data.reduce((acc, item) => {
        return acc + item.sub_total;
      }, 0);

      dispatch({
        type: ACTION.DELETEITEMFROMCART,
        totals: total,
        cart: data,
      });
    } catch (err) {
      setDeleteFoodLoader(false);
      if (err.request.status === 401) {
        navigate("/login");
        localStorage.clear();
        setIsAuthenticated(false);
        dispatch({ type: ACTION.GETINITIALSTATE });
      } else if (!err.response) {
        setUpdateCartErrorMessage("failed to contact the server");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      } else if (err.request.status === 400) {
        setUpdateCartErrorMessage("request failed,try again");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      } else {
        setUpdateCartErrorMessage("an error occured please try again");
        dispatch({ type: ACTION.ERROR, message: updateCartErrorMessage });
      }
    }
  };

  return { deleteFoodloader, deleteFood };
};
