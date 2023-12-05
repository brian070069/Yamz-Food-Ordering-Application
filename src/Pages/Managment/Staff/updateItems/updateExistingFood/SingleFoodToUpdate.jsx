import React from "react";
import { CiEdit } from "react-icons/ci";

const SingleFoodToUpdate = ({ foodDetails, handleNavigate }) => {
  const { food } = foodDetails;
  return (
    <div className="availableItem " key={food?.food_id}>
      <h3>{food?.food_name}</h3>
      <p className="availableItem__price">
        <span>Sh</span>
        {food?.price}
      </p>
      <p
        className={`availableItem__status ${
          !food?.is_avilable && "status_notAvailable"
        }`}
      >
        {food?.is_avilable ? "available" : "not available"}
      </p>
      <button
        className="editAvailable__item row"
        type="button"
        onClick={() => {
          handleNavigate(food.food_id);
        }}
      >
        <CiEdit size={24} />
        <span>edit</span>
      </button>
    </div>
  );
};

export default SingleFoodToUpdate;
