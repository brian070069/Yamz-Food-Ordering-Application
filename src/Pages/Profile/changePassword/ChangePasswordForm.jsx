import React from "react";
import HideShowPassword from "../../../components/PasswordInput";
import InLineInputError from "../../../components/InLineInputError";
import { BsShieldExclamation } from "react-icons/bs";

const ChangePasswordForm = ({ data }) => {
  const { values, handleChange, touched, errors, wrongCredentials } = data;
  return (
    <form action="">
      <div className="input__container">
        <div className="input__header">
          <h3>Old password</h3>
        </div>
        <HideShowPassword
          name={"oldPassword"}
          value={values.oldPassword}
          handleChange={handleChange}
          touched={touched.oldPassword}
          error={errors.oldPassword}
        />
        <InLineInputError
          touched={touched.oldPassword}
          errors={errors.oldPassword}
        />
        {wrongCredentials && (
          <div className="input__error">
            <p>
              <span>
                <i>
                  <BsShieldExclamation />
                </i>
                <span className="errorMessage">
                  {"the password entered does not match for the user logged in"}
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="input__container">
        <div className="input__header">
          <h3>new password</h3>
        </div>
        <HideShowPassword
          name={"newPassword"}
          value={values.newPassword}
          handleChange={handleChange}
          touched={touched.newPassword}
          error={errors.newPassword}
        />
        <InLineInputError
          touched={touched.newPassword}
          errors={errors.newPassword}
        />
      </div>
      <div className="input__container">
        <div className="input__header">
          <h3>confirm Password</h3>
        </div>
        <HideShowPassword
          name={"confirmNewPassword"}
          value={values.confirmNewPassword}
          handleChange={handleChange}
          touched={touched.confirmNewPassword}
          error={errors.confirmNewPassword}
        />
        <InLineInputError
          touched={touched.confirmNewPassword}
          errors={errors.confirmNewPassword}
        />
      </div>
    </form>
  );
};

export default ChangePasswordForm;
