import React from "react";

const StaffSingleFood = ({ orderedFood }) => {
  const { food, quantity, subTotals } = orderedFood;
  const { is_avilable, food_name, price } = food;
  return (
    <div className="food__ordered">
      <div className="food__orderedUpper row">
        <span className="food_orderedName">{food_name}</span>
        {status === "p" ? (
          <span
            className={`food_orderedStatus ${
              !is_avilable && "food_orderedStatusNotAvailable"
            }`}
          >
            {is_avilable ? "availabe" : "not available"}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="food__orderedLower row">
        <div className="food__orderedQuantity">
          <span className="before">quantity:</span>
          <span className="after">
            {quantity} @ {price} each
          </span>
        </div>
        <div className="food__orderdTotal ">
          <span className="before">total:</span>
          <span className="after">sh {subTotals}</span>
        </div>
      </div>
    </div>
  );
};

export default StaffSingleFood;
