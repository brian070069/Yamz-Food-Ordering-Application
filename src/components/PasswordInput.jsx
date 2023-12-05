import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const HideShowPassword = ({ value, touched, handleChange, error, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="inputPassword__container">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={handleChange}
        className={error && touched ? "border__red" : ""}
      />
      <button type="button" onClick={togglePassword}>
        <i>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</i>
      </button>
    </div>
  );
};

export default HideShowPassword;
