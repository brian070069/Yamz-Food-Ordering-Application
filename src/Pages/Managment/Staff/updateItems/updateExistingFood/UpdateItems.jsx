import React from "react";
import AddNewItemBtn from "../addNewFood/AddNewItemBtn";
import AllFoods from "./AllFoods";
import { useHasHigherResponsibility } from "../../../../../hooks/useRequireAuth";
import Header from "../../../../Home/components/Header/Header";
import ManagmentNavigation from "../../../components/ManagmentNavigation";
import SideBar from "../../SideBar";

const UpdateItems = () => {
  // useHasHigherResponsibility("staff");

  return (
    <>
      <Header />
      <SideBar />
      <div className="updateFood__container">
        <AddNewItemBtn />
        <div className="availableItems__container">
          <section className="availableItems__header">
            <h2>Foods</h2>
          </section>
          <AllFoods />
        </div>
        <ManagmentNavigation />
      </div>
    </>
  );
};

export default UpdateItems;
