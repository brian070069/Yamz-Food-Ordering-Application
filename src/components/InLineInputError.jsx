import React from "react";
import { BsShieldExclamation } from "react-icons/bs";

const InLineInputError = ({ touched, errors }) => {
  return (
    <div className="input__error">
      <p>
        {touched && errors ? (
          <span>
            <i>
              <BsShieldExclamation />
            </i>
            <span className="errorMessage">{errors}</span>
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default InLineInputError;
