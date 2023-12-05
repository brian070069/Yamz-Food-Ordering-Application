import React, { useContext } from "react";

import EmptyCart from "./EmptyCart";
import { CartContext } from "../../../../context/CartContext";
import App from "./App";

const Index = () => {
  const [state] = useContext(CartContext);

  return (
    <div className="homeRight__container">
      {state.cartItems.length > 0 ? <App /> : <EmptyCart />}
    </div>
  );
};

export default Index;
