import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartHeader = () => {
  const [state] = useContext(CartContext);
  return (
    <div className="big_cartHeader row">
      <h4>Your basket</h4>
      <h3>
        {state.cartItems.length}
        <span>{state.cartItems.length === 1 ? "item" : "items"}</span>
      </h3>
    </div>
  );
};

export default CartHeader;
