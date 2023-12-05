import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import AdminSideBarNavigation from "./AdminSideBarNavigation";

const SideBarButton = ({ data }) => {
  const { toggleSideBar, isSideBarshow } = data;

  return (
    <>
      <button className="adminSidebar__btn" onClick={toggleSideBar}>
        <RxHamburgerMenu size={28} />
      </button>
      {isSideBarshow && (
        <AdminSideBarNavigation toggleSideBar={toggleSideBar} />
      )}
    </>
  );
};

export default SideBarButton;
