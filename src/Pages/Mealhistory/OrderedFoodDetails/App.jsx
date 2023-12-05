import React from "react";
import OrderDetails from "./OrderDetails";
import ShowQrCodeContextProvider from "./ShowQrCodeContext";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

const App = () => {
  useRequireAuth();
  return (
    <ShowQrCodeContextProvider>
      <OrderDetails />
    </ShowQrCodeContextProvider>
  );
};

export default App;
