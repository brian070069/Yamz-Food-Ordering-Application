import React, { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { HomeContext } from "../../HomeContext";

const PaymentButton = () => {
  const [state] = useContext(CartContext);
  const { handleDispalyPaymentArea } = useContext(HomeContext);
  return (
    <>
      <div className="homeRight__totals row">
        <span>total</span>
        <span>sh {state?.subTotals}</span>
      </div>
      <div className="homeRight__paymentContainer">
        <button type="button" onClick={handleDispalyPaymentArea}>
          proceed to pay {state?.subTotals} shillings
        </button>
      </div>
    </>
  );
};

export default PaymentButton;
