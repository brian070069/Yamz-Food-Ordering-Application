import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthenticated = () => {
  const navigate = useNavigate();

  const pageNavigation = (page) => {
    navigate(page);
  };

  return (
    <div className="row not__authenticated">
      <button
        onClick={() => pageNavigation("/register")}
        className="register__navigation"
      >
        Register
      </button>
      <button
        onClick={() => pageNavigation("/login")}
        className="login__navigation"
      >
        Login
      </button>
    </div>
  );
};

export default NotAuthenticated;
