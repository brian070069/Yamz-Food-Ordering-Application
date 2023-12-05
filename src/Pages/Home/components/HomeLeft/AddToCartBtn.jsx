import React from "react";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { TailSpin } from "react-loader-spinner";

const AddFoodToCartBtn = ({ data }) => {
  const { loading, isFoodInCart, addFoodToCart, food_id } = data;
  return (
    <div>
      <button
        disabled={loading}
        onClick={() => addFoodToCart(food_id)}
        type="button"
        className={`addToCart__btn ${isFoodInCart && "isFoodInCart_btn"}`}
      >
        {loading ? (
          <TailSpin
            height="20"
            width="20"
            color="purple"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{ paddingLeft: "20px" }}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <>{isFoodInCart ? "in cart" : <LiaShoppingBasketSolid size={20} />}</>
        )}
      </button>
    </div>
  );
};

export default AddFoodToCartBtn;
