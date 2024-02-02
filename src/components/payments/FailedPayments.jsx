import React from "react";

const FailedPayments = ({ props }) => {
  const { handleHidePaymentArea, paymentErrorMessages, serverErrorMessages } =
    props;

  return (
    <div className="readyToPay">
      <div className="failedPayments">
        <h4>
          {paymentErrorMessages
            ? paymentErrorMessages
            : serverErrorMessages
            ? serverErrorMessages
            : ""}
        </h4>
        <button
          type="button"
          onClick={() => {
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
