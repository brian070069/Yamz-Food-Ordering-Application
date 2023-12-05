import BigCartLoader from "./BigCartLoader";
import FoodBtns from "./FoodBtns";

const AdjustFoodBtns = ({ props }) => {
  const { updateFoodQuanityInCart, findFood, loading } = props;
  const foodQuanity = findFood.quantity;

  return (
    <>
      {loading ? (
        <BigCartLoader />
      ) : (
        <FoodBtns props={{ updateFoodQuanityInCart, foodQuanity, findFood }} />
      )}
    </>
  );
};

export default AdjustFoodBtns;
