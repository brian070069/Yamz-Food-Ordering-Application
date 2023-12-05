import SingleFoodInList from "./SingleFoodInList";

const OrderFoodList = ({ props }) => {
  const { ordered_food: orderedFood,status } = props;

  return (
    <div className="allFoodOrdered">
      {orderedFood?.map((orderedFood) => {
        return (
          <SingleFoodInList
            key={orderedFood.food.food_id}
            orderedFood={orderedFood}
            status={status}
          />
        );
      })}
    </div>
  );
};

export default OrderFoodList;
