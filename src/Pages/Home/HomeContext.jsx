import React, { createContext } from "react";
import { useGetCartItems } from "../../hooks/useGetCart";
import { useMpesaPayment } from "../../hooks/useMpesaPayment";

export const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const { isLoadingCart, getCartItems, hasError } = useGetCartItems();

  const {
    handleMpesaPayment,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    handleShowLocationArea,
    showLocationArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    isPaymentSucessful,
    paymentErrorMessages,
    isServerErrors,
    serverErrorMessages,
  } = useMpesaPayment();

  return (
    <HomeContext.Provider
      value={{
        isLoadingCart,
        // mpesa
        handleMpesaPayment,
        handleDispalyPaymentArea,
        handleHidePaymentArea,
        handleShowLocationArea,
        showLocationArea,
        showPaymentArea,
        showPhoneNumber,
        isProcessingPayments,
        isPaymentFailed,
        isPaymentSucessful,
        paymentErrorMessages,
        isServerErrors,
        serverErrorMessages,
        getCartItems,
        hasError,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
