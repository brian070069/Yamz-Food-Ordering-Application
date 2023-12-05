import React, { useContext } from "react";
import DropDownHeader from "./DropDownHeader";
import { AuthenticationContext } from "../../../../../context/authContext.";
import Authenticated from "./Authenticated";
import NotAuthenticated from "./NotAuthenticated";

const DropDown = ({ data }) => {
  const { toogleDropDown } = data;
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <div className="home__headerDropDown ">
      <DropDownHeader data={{ toogleDropDown }} />
      {isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
    </div>
  );
};

export default DropDown;
