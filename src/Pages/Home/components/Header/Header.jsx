import React from "react";
import HeaderRight from "./HeaderRight";
import HeaderCenter from "./HeaderCenter.jsx";
import HeaderLeft from "./HeaderLeft";

const Header = () => {
  return (
    <div className="homeHeader__container">
      <div className="home_header row">
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </div>
    </div>
  );
};

export default Header;
