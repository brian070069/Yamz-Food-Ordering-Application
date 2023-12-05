import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./context/CartContext.jsx";
import AuthenticationContextProvider from "./context/authContext..jsx";
import OrderContextProvider from "./context/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <AuthenticationContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </AuthenticationContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
