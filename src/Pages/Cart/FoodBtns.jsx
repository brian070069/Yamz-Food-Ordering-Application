import { BiPlus } from "react-icons/bi";
import { HiMinusSm } from "react-icons/hi";
import React from "react";

const FoodBtns = ({ props }) => {
  const { updateFoodQuanityInCart, foodQuanity, findFood } = props;

  return (
    <div className="totals__BigCartadjustBtnContainer">
      <h4>total {findFood.sub_total}</h4>
      <div className="bigCart_adjustFoodBtn">
        <div className="bigCartincrement__decrementFood row">
          <button
            className={`bigCartadjustFoodBtn ${
              foodQuanity <= 1 && "disabled__btn"
            } `}
            type="button"
            onClick={() => updateFoodQuanityInCart("subtraction")}
          >
            <i>
              <HiMinusSm />
            </i>
          </button>
          <h4>{findFood.quantity}</h4>
          <button
            type="button"
            className="bigCartadjustFoodBtn"
            onClick={() => updateFoodQuanityInCart("addition")}
          >
            <i>
              <BiPlus />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodBtns;
