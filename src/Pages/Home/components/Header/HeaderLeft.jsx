import React from "react";
import { useNavigate } from "react-router-dom";


const HeaderLeft = () => {
  const navigate = useNavigate()
  return (
    <div className="header__left row">
      <div onClick={()=>navigate("/")}>
        <img src="https://ik.imagekit.io/kzmqi6dbk/logo2_6VhjzQesV?updatedAt=1689687652550" alt="" />
      </div>
    </div>
  );
};

export default HeaderLeft;
