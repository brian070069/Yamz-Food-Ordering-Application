import React from "react";
import HideShowPassword from "../../../../components/PasswordInput";
import { passwordValidationSchema } from "../../RegistrationValidation";
import InLineInputError from "../../../../components/InLineInputError";
import { useFormik } from "formik";
import HandleFormBtn from "../../../../components/HandleFormBtn";
import { useRegisterThirdStep } from "./HandleRegistratonSteps";

const ThirdStep = () => {
  const { handleRegister, isLoading } = useRegisterThirdStep();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    //send verfication code
    onSubmit: () => {
      handleRegister(values);
    },
  });

  return (
    <form>
      <div className="input__container">
        <div className="input__header">
          <h3>your password</h3>
        </div>
        <HideShowPassword
          name={"password"}
          value={values.password}
          handleChange={handleChange}
          touched={touched.password}
          error={errors.password}
        />
        <InLineInputError touched={touched.password} errors={errors.password} />
      </div>
      <div className="input__container input__bottom">
        <div className="input__header">
          <h3>confirm password</h3>
        </div>
        <HideShowPassword
          name={"confirmPassword"}
          value={values.confirmPassword}
          handleChange={handleChange}
          touched={touched.confirmPassword}
          error={errors.confirmPassword}
        />
        <InLineInputError
          touched={touched.confirmPassword}
          errors={errors.confirmPassword}
        />
      </div>

      <HandleFormBtn
        handleForm={handleSubmit}
        loading={isLoading}
        content="next"
      />
    </form>
  );
};

export default ThirdStep;
