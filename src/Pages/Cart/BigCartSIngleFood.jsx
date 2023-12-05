import AdjustFoodBtns from "./AdjustFoodBtns";
import {
  useDeleteFood,
  useUpdateFoodQuantity,
} from "../../hooks/useUpdateCart";
import DeleteFood from "./DeleteFoodBtn";

const BigCartSingleFood = ({ food }) => {
  const { food_id, food_name, price, food_image } = food;

  const { updateFoodQuanityInCart, findFood, loading } =
    useUpdateFoodQuantity(food_id);
  const { deleteFood, deleteFoodloader } = useDeleteFood(food_id);

  return (
    <div className="bigCart__item">
      <div className="bigCart_itemImage_Container">
        <img src={food_image} alt="food" />
      </div>
      <div className="bigCartSingleItem__leftContainer ">
        <AdjustFoodBtns
          props={{ updateFoodQuanityInCart, findFood, loading }}
        />
        <div className="bigCart__foodName row">
          <h4>{food_name}</h4>
        </div>
        <DeleteFood props={{ deleteFood, deleteFoodloader, price }} />
      </div>
    </div>
  );
};

export default BigCartSingleFood;
