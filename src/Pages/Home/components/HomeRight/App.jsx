import React, { useContext } from "react";
import HomeRightHeader from "./HomeRightHeader";
import SingleItem from "./SingleItem";
import PaymentButton from "./PaymentButton";
import { useGetCartItems } from "../../../../hooks/useGetCart";
import { CartContext } from "../../../../context/CartContext";

const App = () => {
  const [state] = useContext(CartContext);

  return (
    <div className="homeRight__container">
      <HomeRightHeader />
      <div className="homeRight__cart">
        {state?.cartItems?.length > 0 &&
          state?.cartItems.map((item) => {
            return <SingleItem key={item?.food?.food_id} {...item} />;
          })}
      </div>
      <PaymentButton />
    </div>
  );
};

export default App;
