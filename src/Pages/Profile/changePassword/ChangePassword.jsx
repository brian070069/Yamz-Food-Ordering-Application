import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../../context/authContext.";
import axios from "axios";
import Header from "../../../components/Header";
import ChangePasswordForm from "./ChangePasswordForm";
import HandleFormBtn from "../../../components/HandleFormBtn";
import { ChangepasswordValidation } from "./ChangePasswordValidation";
import { toast } from "react-toastify";
import { userUrl } from "../../../services/BaseUrls";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

const ChangePassword = () => {
  useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [passwordChangeSuccesfully, setPasswordChangedSuccesfully] =
    useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangepasswordValidation,
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      const body = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmNewPassword,
      };

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setLoading(true);
        await axios.post(userUrl + "change_password/", body, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        //password change succesfully
        setPasswordChangedSuccesfully(true);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } catch (err) {
        setLoading(false);
        setPasswordChangedSuccesfully(false);
        if (err.request.status === 401) {
          navigate("/login");
          localStorage.clear();
          setIsAuthenticated(false);
        } else if (!err.response) {
          toast.error("failed to contact server,please try again");
        } else if (err.request.status === 400) {
          setWrongCredentials(true);
        } else {
          toast.error("an error occured please try again");
        }
      }
    },
  });

  //show Message and redirect to login
  useEffect(() => {
    let t;
    if (passwordChangeSuccesfully) {
      t = setTimeout(() => {
        toast.success("password change successfully", {
          position: "top-center",
        });
        setLoading(false);
        navigate("/login", { replace: true });
        setIsAuthenticated(false);
        localStorage.clear();
      }, 1000);
    }
    return () => {
      clearTimeout(t);
    };
  }, [passwordChangeSuccesfully]);

  return (
    <>
      <Header />
      <div className="auth__info">
        <h3>change password</h3>
      </div>
      <div className="auth__formContainer">
        <ChangePasswordForm
          data={{
            values,
            handleChange,
            touched,
            errors,
            wrongCredentials,
          }}
        />
        <HandleFormBtn
          handleForm={handleSubmit}
          loading={loading}
          content="change password"
        />
      </div>
    </>
  );
};

export default ChangePassword;
