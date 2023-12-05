import React, { createContext, useReducer } from "react";

export const ShowQrCodeContext = createContext();

const ShowQrCodeContextProvider = ({ children }) => {
  return (
    <ShowQrCodeContext.Provider value={"brian"}>
      {children}
    </ShowQrCodeContext.Provider>
  );
};

export default ShowQrCodeContextProvider;
