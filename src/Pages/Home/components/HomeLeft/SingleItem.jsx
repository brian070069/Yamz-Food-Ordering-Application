import React from "react";
import Rating from "../Ratings/Rating";
import AddFoodToCartBtn from "./AddToCartBtn";
import { useAddFoodToCart } from "../../../../hooks/useAddFoodToCart";

const SingleItem = ({ data }) => {
  const { food_id, food_name, price, food_image } = data;
  const { loading, isFoodInCart, addFoodToCart } = useAddFoodToCart(food_id);

  return (
    <div className="item__container">
      <div className="itemImage__container">
        <img src={food_image} alt="foodImage" />
      </div>
      <Rating rate={2.5} iconSize={19.5} />
      <div className="item__name row">
        <span className="item__name ">{food_name}</span>
      </div>
      <div className="item__btnPrice row">
        <AddFoodToCartBtn
          data={{ loading, isFoodInCart, addFoodToCart, food_id }}
        />
        <span className="item__price">sh {price}</span>
      </div>
    </div>
  );
};

export default SingleItem;
