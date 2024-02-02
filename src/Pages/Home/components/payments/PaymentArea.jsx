import { useContext } from "react";
import { HomeContext } from "../../HomeContext";
import ReadyToPay from "../../../../components/payments/ReadyToPay";
import ProcessingPayments from "../../../../components/payments/ProcessingPayments";
import SuccessfulPayments from "../../../../components/payments/SuccesfulPayments";
import FailedPayments from "../../../../components/payments/FailedPayments";
import Location from "../../../../components/payments/Location";

const PaymentsArea = () => {
  const {
    handleMpesaPayment,
    handleHidePaymentArea,
    handleShowLocationArea,
    handleDispalyPaymentArea,
    showLocationArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    isPaymentSucessful,
    paymentErrorMessages,
    serverErrorMessages,
  } = useContext(HomeContext);

  return (
    <>
      {showPaymentArea && (
        <div className="payments row">
          <div className="paymentContainer">
            {showPhoneNumber && (
              <ReadyToPay
                data={{
                  handleHidePaymentArea,
                  handleDispalyPaymentArea,
                  handleMpesaPayment,
                }}
              />
            )}
            {showLocationArea && (
              <Location
                data={{
                  handleDispalyPaymentArea,
                  handleHidePaymentArea,
                }}
              />
            )}
            {/* processing payments */}
            {isProcessingPayments && (
              <ProcessingPayments
                processingPayments
                message={"processing your payments"}
              />
            )}

            {/* payment successful */}
            {isPaymentSucessful && (
              <SuccessfulPayments
                props={{
                  message: "payment completed succesfully",
                  handleShowLocationArea,
                }}
              />
            )}

            {/* failed payments */}
            {isPaymentFailed && (
              <FailedPayments
                props={{
                  handleHidePaymentArea,
                  paymentErrorMessages,
                  serverErrorMessages,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentsArea;
