import { createContext, useState } from "react";

export const RegisterContext = createContext();

const RegistrationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [registrationDetails, setRegistrationDetails] = useState({
    phoneNumber: "",
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });

  //move to next form
  const moveNextPage = () => {
    if (currentPage >= 3) {
      setCurrentPage(3);
      return;
    }
    setCurrentPage((prevPage) => {
      return prevPage + 1;
    });
  };

  // move to prev Form
  const movePrevForm = () => {
    if (currentPage <= 0) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage((prevPage) => {
      return prevPage - 1;
    });
  };

  return (
    <RegisterContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        moveNextPage,
        movePrevForm,
        setRegistrationDetails,
        registrationDetails,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegistrationProvider;
