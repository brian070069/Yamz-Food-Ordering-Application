import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const BigCartPayments = ({ props }) => {
  const [state] = useContext(CartContext);
  const { handleDispalyPaymentArea } = props;

  return (
    <div className="payment bigCart_payment ">
      <section className="row">
        <h4>subTotals:</h4>
        <h4>sh {state.subTotals}</h4>
      </section>
      <p>
        The Payment method used is M-PESA. A push notification will be sent to
        the phone number registered with this account to complete the purchase
      </p>
      <button type="button" onClick={handleDispalyPaymentArea}>
        proceed to pay {state.subTotals} shillings
      </button>
    </div>
  );
};

export default BigCartPayments;
