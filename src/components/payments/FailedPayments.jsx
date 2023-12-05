import React from "react";

const FailedPayments = ({ props }) => {
  const {
    handleHidePaymentArea,
    paymentErrorMessages,
    serverErrorMessages,
    redeemErrorMessage,
    handleHideRedeemArea,
  } = props;

  return (
    <div className="readyToPay">
      <div className="failedPayments">
        <h4>
          {paymentErrorMessages
            ? paymentErrorMessages
            : redeemErrorMessage
            ? redeemErrorMessage
            : serverErrorMessages
            ? serverErrorMessages
            : ""}
        </h4>
        <button
          type="button"
          onClick={() => {
            handleHideRedeemArea();
            handleHidePaymentArea();
          }}
        >
          try again
        </button>
      </div>
    </div>
  );
};

export default FailedPayments;
