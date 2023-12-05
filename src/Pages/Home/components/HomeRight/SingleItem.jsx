import React from "react";
import CartLoader from "./CartLoader";
import AdjustFoodQuanitityBtn from "./AdjustFoodQuanitityBtn";
import {
  useDeleteFood,
  useUpdateFoodQuantity,
} from "../../../../hooks/useUpdateCart";

const SingleItem = ({ food }) => {
  const { food_id, food_name, food_image, price } = food;
  const {
    updateFoodQuanityInCart: updateFoodQuantity,
    findFood,
    loading,
  } = useUpdateFoodQuantity(food_id);
  const { deleteFood: removeFood, deleteFoodloader } = useDeleteFood(food_id);

  return (
    <div className="homeRight__item">
      <div className="homeRightImage__container">
        <img src={food_image} alt="" />
      </div>
      <section className="row">
        <div className="homeRight__namePrice row">
          <span>{food_name}</span>
          <span>sh {price}</span>
        </div>
        {loading || deleteFoodloader ? (
          <CartLoader />
        ) : (
          <AdjustFoodQuanitityBtn
            props={{
              removeFood,
              foodQuanity: findFood.quantity,
              updateFoodQuantity,
            }}
          />
        )}
      </section>
    </div>
  );
};

export default SingleItem;
