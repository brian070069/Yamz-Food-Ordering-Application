import React from "react";
import { BsShieldExclamation } from "react-icons/bs";

const WrongCredentials = ({ message }) => {
  return (
    <div className="input__error">
      <p>
        <span>
          <i>
            <BsShieldExclamation />
          </i>
          <span className="errorMessage">{message}</span>
        </span>
      </p>
    </div>
  );
};

export default WrongCredentials;
