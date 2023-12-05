import React from "react";
import AllOrders from "./Orders/AllOrders";
import Header from "./components/Header";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import HomeLeftLinks from "../Home/components/mobile/HomeLeftLinks";

const MealHistory = () => {
  useRequireAuth();
  return (
    <>
      <div className="mealHistory">
        <Header />
        <div className="orders__container">
          <div className="orders__header">
            <h4>Your Orders</h4>
          </div>
          <AllOrders />
        </div>
      </div>
      <HomeLeftLinks />
    </>
  );
};

export default MealHistory;
