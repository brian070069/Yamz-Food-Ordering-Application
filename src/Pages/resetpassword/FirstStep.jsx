import React, { useState } from "react";
import { useFormik } from "formik";
import HandleFormBtn from "../../components/HandleFormBtn";
import InLineInputError from "../../components/InLineInputError";
import WrongCredentials from "../../components/WrongCredentials";
import { userUrl } from "../../services/BaseUrls";
import { phoneNumberValidationSchema } from "../SignUp/RegistrationValidation";

const FirstStep = ({ props }) => {
  const [wrongCredentialError, setWrongCredentialError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { moveNextSection, userDetails, setUserDetails } = props;

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let phoneNumber = values.phoneNumber;

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+254" + phoneNumber.slice(1);
      }

      try {
        const response = await fetch(userUrl + "check_phone_number/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone_number: phoneNumber }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const email = errorData.email[0];

          if (errorData && errorData.message[0]) {
            try {
              const sendCodeResponse = await fetch(userUrl + "send_code/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ phone_number: phoneNumber }),
              });

              if (!sendCodeResponse.ok) {
                setError(true);
              } else {
                moveNextSection();
                setUserDetails({
                  ...userDetails,
                  email,
                  phoneNumber: values.phoneNumber,
                });
              }
            } catch (err) {
              setError(true, 1);
            }
          } else {
            setError(true);
          }
        } else {
          setWrongCredentialError(true);
        }
      } catch (err) {
        setError(true, 2);
      }
      setLoading(false);
    },
  });

  return (
    <div className="registration__container">
      <div className="auth__formContainer resetPassword__container">
        {error && <Error message="An error occurred. Please try again." />}
        <div className="resetPassword__info">
          <h4>Reset Your Password</h4>
          <p>
            A Verification Code will be sent to the email registered with this
            phone number for password reset
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input__container ">
            <div className="input__header">
              <h3>Your Phone Number</h3>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="eg 0740774613"
              value={values.phoneNumber}
              onChange={handleChange}
              className={
                errors.phoneNumber && touched.phoneNumber ? "border__red" : ""
              }
            />
            <InLineInputError
              touched={touched.phoneNumber}
              errors={errors.phoneNumber}
            />
            {wrongCredentialError && (
              <WrongCredentials message="User not found. Please check the number." />
            )}
          </div>
          <HandleFormBtn
            handleForm={handleSubmit}
            loading={loading}
            content="Send Code"
          />
        </form>
      </div>
    </div>
  );
};

export default FirstStep;
