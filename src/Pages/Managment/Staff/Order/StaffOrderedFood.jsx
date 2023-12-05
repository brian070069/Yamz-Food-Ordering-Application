import React from "react";
import StaffSingleFood from "./StaffSingleFood";

const StaffOrderedFood = ({ props }) => {
  const { orderedFood } = props;
  return (
    <div className="allFoodOrdered">
      {orderedFood?.map((orderedFood) => {
        return (
          <StaffSingleFood
            key={orderedFood.food.food_id}
            orderedFood={{
              food: orderedFood?.food,
              quantity: orderedFood.quantity,
              subTotals: orderedFood.sub_total,
            }}
          />
        );
      })}
    </div>
  );
};

export default StaffOrderedFood;
