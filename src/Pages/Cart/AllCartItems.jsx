import { useContext } from "react";
import BigCartSingleFood from "./BigCartSIngleFood";
import { CartContext } from "../../context/CartContext";

const AllCartItems = () => {
  const [state] = useContext(CartContext);

  return (
    <section className="big_cartItems">
      {state.cartItems.map((item) => {
        return <BigCartSingleFood key={item.food.food_id} {...item} />;
      })}
    </section>
  );
};

export default AllCartItems;
