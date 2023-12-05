import React, { useContext } from "react";
import { useGetCartItems } from "../../hooks/useGetCart";
import AllCartItems from "./AllCartItems";
import BigCartPayments from "./BigCartPayments";
import Header from "../../components/Header";
import CartHeader from "./CartHeader";
import { CartContext } from "../../context/CartContext";
import emptyCart from "../../assets/emptyCart.svg";
import { useMpesaPayment } from "../../hooks/useMpesaPayment";
import ReadyToPay from "../../components/payments/ReadyToPay";
import SuccessfulPayments from "../../components/payments/SuccesfulPayments";
import ProcessingPayments from "../../components/payments/ProcessingPayments";
import FailedPayments from "../../components/payments/FailedPayments";
import { useRedeemPoints } from "../../hooks/useRedeemPoints";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Location from "../../components/payments/Location";

const Cart = () => {
  useRequireAuth();
  const [state] = useContext(CartContext);
  useGetCartItems();

  const {
    redeemPoints,
    isRedeemingPoints,
    showRedeemingPhoneNumberArea,
    redeemedSuccesfully,
    failedToRedeem,
    redeemErrorMessage,
    handleHideRedeemArea,
  } = useRedeemPoints();
  const {
    handleMpesaPayment,
    handleShowLocationArea,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showLocationArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    paymentErrorMessages,
    isPaymentSucessful,
    serverErrorMessages,
  } = useMpesaPayment();

  return (
    <div className="big__cartContainer">
      <Header />
      {state.error && <Error message="An error occured" />}
      {state.cartItems.length <= 0 ? (
        <div className="bigCartEmpty">
          <p>Your Cart is Empty</p>
          <div className="bigCart__emptyImageContainer">
            <img src={emptyCart} alt="img" />
          </div>
        </div>
      ) : (
        <div className="big_cart">
          <div className="big_cartLeft">
            <CartHeader />
            <AllCartItems />
          </div>
          <BigCartPayments props={{ handleDispalyPaymentArea }} />
        </div>
      )}

      {/* ready to pay */}
      <>
        {showPaymentArea && (
          <div className="payments row">
            <div className="paymentContainer">
              {showPhoneNumber && showRedeemingPhoneNumberArea && (
                <ReadyToPay
                  data={{
                    handleHidePaymentArea,
                    handleDispalyPaymentArea,
                    handleMpesaPayment,
                    handleRedeemPoints: redeemPoints,
                  }}
                />
              )}
              {showLocationArea && (
                <Location
                  data={{
                    handleDispalyPaymentArea,
                    handleHidePaymentArea,
                    handleRedeemPoints: redeemPoints,
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
              {isRedeemingPoints && (
                <ProcessingPayments redeeming message={"redeeming..."} />
              )}

              {/* payment successful */}
              {isPaymentSucessful && (
                <SuccessfulPayments
                  props={{
                    message: "payment completed succesfully",
                    handleShowLocationArea,
                    handleHideRedeemArea,
                  }}
                />
              )}
              {redeemedSuccesfully && (
                <SuccessfulPayments
                  props={{
                    message: "redeemed succesfully",
                    handleHidePaymentArea,
                    handleHideRedeemArea,
                  }}
                />
              )}

              {/* failed payments */}
              {isPaymentFailed && (
                <FailedPayments
                  props={{
                    handleHidePaymentArea,
                    paymentErrorMessages,
                    redeemErrorMessage,
                    serverErrorMessages,
                    handleHideRedeemArea,
                  }}
                />
              )}
              {failedToRedeem && (
                <FailedPayments
                  props={{
                    handleHidePaymentArea,
                    redeemErrorMessage,
                    handleHideRedeemArea,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
