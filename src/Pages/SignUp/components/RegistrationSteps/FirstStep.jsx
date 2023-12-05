import React, { useContext } from "react";
import { phoneNumberValidationSchema } from "../../RegistrationValidation";
import InLineInputError from "../../../../components/InLineInputError";
import { RegisterContext } from "../../RegistrationContext";
import { useFormik } from "formik";
import { BsShieldExclamation } from "react-icons/bs";
import HandleFormBtn from "../../../../components/HandleFormBtn";
import { useRegisterFirstStep } from "./HandleRegistratonSteps";

const FirstStep = () => {
  const { registrationDetails } = useContext(RegisterContext);
  const { isLoading, doesUserExist, handleRegister } = useRegisterFirstStep();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      phoneNumber: registrationDetails.phoneNumber,
    },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <form>
      <div className="input__container ">
        <div className="input__header">
          <h3>your phoneNumber</h3>
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
        {doesUserExist && (
          <div className="input__error">
            <p>
              <span>
                <i>
                  <BsShieldExclamation />
                </i>
                <span className="errorMessage">
                  user with this phone number already exist
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
      <HandleFormBtn
        handleForm={handleSubmit}
        loading={isLoading}
        content="continue"
      />
    </form>
  );
};

export default FirstStep;
