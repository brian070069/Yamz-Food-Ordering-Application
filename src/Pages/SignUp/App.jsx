import React, { useContext } from "react";
import FirstStep from "./components/RegistrationSteps/FirstStep";
import SecondStep from "./components/RegistrationSteps/SecondStep";
import ThirdStep from "./components/RegistrationSteps/ThirdStep";
import LastStep from "./components/RegistrationSteps/LastStep";
import FormHeader from "./components/FormHeader";
import RegistartionHeader from "./components/RegistrationHeader";
import { RegisterContext } from "./RegistrationContext";

const App = () => {
  const { currentPage } = useContext(RegisterContext);

  return (
    <>
      <div className="registration__container">
        <RegistartionHeader />
        <FormHeader />
        <div className="auth__formContainer">
          {currentPage === 0 && <FirstStep />}
          {currentPage === 1 && <SecondStep />}
          {currentPage === 2 && <ThirdStep />}
          {currentPage === 3 && <LastStep />}
        </div>
      </div>
    </>
  );
};

export default App;
