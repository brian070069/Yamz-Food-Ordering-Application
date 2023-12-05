import React from "react";
import HideShowPassword from "../../components/PasswordInput";
import InLineInputError from "../../components/InLineInputError";
import { useFormik } from "formik";
import { LoginValidationSchema } from "./LoginValidation";
import WrongCredentials from "../../components/WrongCredentials";
import HandleFormBtn from "../../components/HandleFormBtn";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";

const LoginForm = () => {
  const { loading, handleLogin, wrongCredentialsError } = useLogin();

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (value) => {
      handleLogin(value);
    },
  });

  return (
    <div className="auth__formContainer">
      <form>
        <div className="input__container login__phoneNumber">
          <div className="input__header">
            <h3> phone Number</h3>
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
        </div>
        <div className="input__container">
          <div className="input__header">
            <h3>password</h3>
          </div>
          <HideShowPassword
            name={"password"}
            value={values.password}
            handleChange={handleChange}
            touched={touched.password}
            error={errors.password}
          />
          <InLineInputError
            touched={touched.password}
            errors={errors.password}
          />

          {/* wrong credentials */}
          {wrongCredentialsError && (
            <WrongCredentials
              message={"uknown phone number or invalid password"}
            />
          )}
        </div>

        {/* login button */}
        <HandleFormBtn
          handleForm={handleSubmit}
          content="login"
          loading={loading}
        />
      </form>
      <span className="forgotPassword__link">
        <Link to="/forgotPassword">Forgot Password?</Link>
      </span>
    </div>
  );
};

export default LoginForm;
