import React from "react";
import { useNavigate } from "react-router-dom";
import SingleFoodToUpdate from "./SingleFoodToUpdate";
import { useFetch } from "../../../../../hooks/useFetch";
import { cartBaseUrl } from "../../../../../services/BaseUrls";

const AllFoods = () => {
  const { fetchedItems, isLoading } = useFetch(cartBaseUrl + "food/");
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    const foodToUpdate = fetchedItems.find((food) => food.food_id === id);

    if (foodToUpdate) {
      navigate(`/staff/item/${id}`);
    } else {
      navigate("*");
    }
  };
  return (
    <div>
      {isLoading ? (
        <h3 className="updateFoodLoader">Loading......</h3>
      ) : (
        fetchedItems.map((food) => {
          return (
            <SingleFoodToUpdate
              key={food.food_id}
              foodDetails={{ food }}
              handleNavigate={handleNavigate}
            />
          );
        })
      )}
    </div>
  );
};

export default AllFoods;
