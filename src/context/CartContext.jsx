import { createContext, useReducer } from "react";
import { initialState, reducer } from "../Pages/Home/HomeReducer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  return (
    <CartContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
