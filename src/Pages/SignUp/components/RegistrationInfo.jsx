import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RegisterContext } from "../RegistrationContext";

const RegistrationInfo = ({ Id, info }) => {
  const { currentPage } = useContext(RegisterContext);

  return (
    <div className={`${currentPage === Id ? "" : "invisible"}`}>
      <h3>{currentPage === Id && info}</h3>
    </div>
  );
};

export default RegistrationInfo;
