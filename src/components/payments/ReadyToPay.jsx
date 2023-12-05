import React from "react";
import InLineInputError from "../InLineInputError";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { phoneNumberValidationSchema } from "../../Pages/SignUp/RegistrationValidation";

const ReadyToPay = ({ data }) => {
  const { handleHidePaymentArea, handleMpesaPayment, handleRedeemPoints } =
    data;
  const token = localStorage.getItem("token");
  let decodedPhoneNumber;
  if (token) {
    decodedPhoneNumber = jwtDecode(token).phone_number;
  }

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: { phoneNumber: decodedPhoneNumber },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: (values) => {
      let phoneNumber = values.phoneNumber.replace("0", "254");
      handleMpesaPayment(phoneNumber);
    },
  });

  return (
    <div className="readyToPay">
      <div className="readyToPay__header row">
        <h4>Enter the phone number to pay with </h4>
        <button onClick={handleHidePaymentArea}>
          <i>
            <RxCross2 size={20} />
          </i>
        </button>
      </div>
      <div className="inputContainer row">
        <span>
          A push notification will the sent to the phone number entered to
          complete the transactions
        </span>
        <input
          type="text"
          name="phoneNumber"
          placeholder="e.g 074077467"
          value={values.phoneNumber}
          onChange={handleChange}
          errors={errors.phoneNumber}
          className={
            errors.phoneNumber && touched.phoneNumber ? "border__red" : ""
          }
        />
        <InLineInputError
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
        />
      </div>

      <div className="payment__buttons row">
        {/* <button>cancel</button> */}
        <button type="button" onClick={handleSubmit}>
          pay
        </button>
        <button type="button" onClick={handleRedeemPoints}>
          redeem pts
        </button>
      </div>
    </div>
  );
};

export default ReadyToPay;
