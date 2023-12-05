import Header from "../../../Home/components/Header/Header";
import AllFoodTableStats from "./AllFoodTableStats";
import { useState } from "react";
import { useHasHigherResponsibility } from "../../../../hooks/useRequireAuth";
import SideBarButton from "../Components/SideBarButton";

const Admin = () => {
  const [isSideBarshow, setIsSideBarShow] = useState(false);
  // useHasHigherResponsibility("admin");

  const toggleSideBar = () => {
    setIsSideBarShow((prevStatus) => !prevStatus);
  };
  return (
    <div className="admin__container">
      <Header />
      <SideBarButton data={{ toggleSideBar, isSideBarshow }} />
      <AllFoodTableStats />
    </div>
  );
};

export default Admin;
