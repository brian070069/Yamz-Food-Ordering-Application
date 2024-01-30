import React from "react";
import DropDownHeader from "./DropDownHeader";
import AuthenticatedNavigation from "./AuthenticatedNavigation";

const DropDown = ({ data }) => {
  const { toogleDropDown } = data;

  return (
    <div className="home__headerDropDown ">
      <DropDownHeader data={{ toogleDropDown }} />
      {<AuthenticatedNavigation />}
    </div>
  );
};

export default DropDown;
