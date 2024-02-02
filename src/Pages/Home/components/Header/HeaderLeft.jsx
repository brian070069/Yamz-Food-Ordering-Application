import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="header__left row">
      <div onClick={() => navigate("/")}>
        <h1>Sansiroo</h1>
      </div>
    </div>
  );
};

export default HeaderLeft;
