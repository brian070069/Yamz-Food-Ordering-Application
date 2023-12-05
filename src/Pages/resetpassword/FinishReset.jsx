import InLineInputError from "../../components/InLineInputError";
import HideShowPassword from "../../components/PasswordInput";
import { useFormik } from "formik";
import HandleFormBtn from "../../components/HandleFormBtn";
import { resetPasswordValidationSchema } from "./FinishResetValidationSchema";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WrongCredentials from "../../components/WrongCredentials";
import { userUrl } from "../../services/BaseUrls";
import { toast } from "react-toastify";

const FinishReset = ({ props }) => {
  const { userDetails } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [hasWrongVerificationCode, setHasWrongVerificationCode] =
    useState(false);
  const navigate = useNavigate();

  //formik
  const { values, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      verificationCode: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async () => {
      const userInfo = {
        phone_number: userDetails.phoneNumber,
        new_password: values.password,
        code: values.verificationCode,
      };
      try {
        setIsLoading(true);
        await axios.post(userUrl + "reset_password/", userInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        setIsSuccessful(true);
        toast.success("password reset succesfully", {
          theme: "dark",
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      } catch (err) {
        setIsLoading(false);
        if (!err.response) {
          toast.error("failed to contact the server", {
            position: "top-center",
            theme: "dark",
          });
        } else if (err.request.status === 400) {
          setHasWrongVerificationCode(true);
        } else {
          toast.error("unknown error occured please try again", {
            position: "top-center",
            theme: "dark",
          });
        }
      }
    },
  });

  return (
    <div className="registration__container">
      <div className="auth__formContainer resetPassword__container">
        <div className="resetPassword__info">
          <h4>finish password reset</h4>
        </div>
        <form action="">
          <div className="input__container login__phoneNumber">
            <div className="input__header">
              <h3> phone number</h3>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="eg 0740774613"
              value={userDetails.phoneNumber}
              disabled
            />
          </div>
          <div className="input__container">
            <div className="input__header">
              <h3>new password</h3>
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
          </div>
          <div className="input__container">
            <div className="input__header">
              <h3>verfication Code</h3>
            </div>
            <input
              type="text"
              name="verificationCode"
              value={values.verificationCode}
              onChange={handleChange}
              className={
                errors.verificationCode && touched.verificationCode
                  ? "border__red"
                  : ""
              }
            />
            <InLineInputError
              touched={touched.verificationCode}
              errors={errors.verificationCode}
            />
            {hasWrongVerificationCode && (
              <WrongCredentials message="invalid code" />
            )}
          </div>
        </form>
        <HandleFormBtn
          loading={isLoading}
          handleForm={handleSubmit}
          content="finish password reset"
        />
      </div>
    </div>
  );
};

export default FinishReset;
