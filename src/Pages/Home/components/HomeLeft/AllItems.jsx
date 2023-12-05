import React, { useContext, useEffect } from "react";
import SingleItem from "./SingleItem";
import { CartContext } from "../../../../context/CartContext";
import { ACTION } from "../../HomeReducer";

const AllItems = ({ data }) => {
  const [initialState, dispatch] = useContext(CartContext);
  const { fetchedItems } = data;

  useEffect(() => {
    const availableFood = fetchedItems.filter(
      (food) => food.is_avilable === true
    );

    dispatch({ type: ACTION.GETAVAILABLEFOOD, payload: availableFood });
  }, [fetchedItems]);

  return (
    <div className="items__container">
      {initialState.availableFoods.length > 0 &&
        initialState.availableFoods.map((food) => {
          return <SingleItem key={food?.food_id} data={food} />;
        })}
    </div>
  );
};

export default AllItems;
