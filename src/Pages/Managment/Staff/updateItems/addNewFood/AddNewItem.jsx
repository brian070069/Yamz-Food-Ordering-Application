import React from "react";
import SideBar from "../../SideBar";
import AddNewItemForm from "./AddNewItemForm";
import { useHasHigherResponsibility } from "../../../../../hooks/useRequireAuth";
import Header from "../../../../Home/components/Header/Header";
import ManagmentNavigation from "../../../components/ManagmentNavigation";

const AddNewItem = () => {
  // useHasHigherResponsibility("staff");

  return (
    <>
      <Header />
      <SideBar />
      <AddNewItemForm />
      <ManagmentNavigation />
    </>
  );
};

export default AddNewItem;
