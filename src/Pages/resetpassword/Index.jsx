import React, { useState } from "react";
import FirstStep from "./FirstStep";
import FinishReset from "./FinishReset";
import Header from "../../components/Header";

const ForgotPassword = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [userDetails, setUserDetails] = useState({
    email: "",
    phoneNumber: "",
  });

  const moveNextSection = () => {
    if (currentSection >= 2) {
      return;
    }
    setCurrentSection((prevValue) => {
      return prevValue + 1;
    });
  };

  return (
    <div>
      <Header />
      {currentSection === 0 && (
        <FirstStep props={{ moveNextSection, setUserDetails, userDetails }} />
      )}
      {currentSection === 1 && <FinishReset props={{ userDetails }} />}
    </div>
  );
};

export default ForgotPassword;
