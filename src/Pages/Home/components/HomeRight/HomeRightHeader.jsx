import React, { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";

const HomeRightHeader = () => {
  const [state] = useContext(CartContext);

  return (
    <div className="homeRight__headerContainer">
      <h4>Cart - {state?.cartItems?.length} </h4>
    </div>
  );
};

export default HomeRightHeader;
