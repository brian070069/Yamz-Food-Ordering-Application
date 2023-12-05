import React from "react";
import RegistrationProvider from "./RegistrationContext";
import App from "./App";

const Register = () => {
  return (
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
};

export default Register;
