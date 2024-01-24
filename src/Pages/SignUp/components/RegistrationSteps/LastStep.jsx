import React, { useContext, useEffect, useState } from "react";
import HandleFormBtn from "../../../../components/HandleFormBtn";
import { BsShieldExclamation } from "react-icons/bs";
import { RegisterContext } from "../../RegistrationContext";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../../../services/BaseUrls";
import { AuthenticationContext } from "../../../../context/authContext.";
import axios from "axios";

const LastStep = () => {
  const [count, setCount] = useState(60);
  const { registrationDetails, setRegistrationDetails } =
    useContext(RegisterContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  //register
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate the input
    // if (verificationCode.length < 0 || verificationCode === "") {
    //   setErrors(true);
    //   return;
    // }
    // const verificationcodeArray = verificationCode.split("~");
    // const newVerificationCode = verificationcodeArray.join("");

    let phoneNumber = registrationDetails.phoneNumber;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+254" + phoneNumber.slice(1);
    }

    if (registrationDetails.verificationCode) {
      const userDetails = {
        phone_number: phoneNumber,
        email: registrationDetails.email,
        first_name: registrationDetails.name,
        last_name: "qmelter",
        verification_code: registrationDetails?.verificationCode,
        password: registrationDetails.password,
      };

      const register = async () => {
        setLoading(true);
        try {
          const response = await fetch(userUrl + "registration/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userDetails),
          });

          //check for errors
          if (!response.ok) {
            setLoading(false);
            const errorData = await response.json();
            console.log(errorData);
            // check verfication code errors
            if (errorData && errorData.message) {
              setServerErrors({
                status: true,
                message: errorData.message,
              });
            }
            return;
          }

          // finish registration
          const data = await response.json();
          setLoading(false);
          setIsAuthenticated(true);
          navigate("/");
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          localStorage.setItem("token", data.access_token);
        } catch (err) {
          setLoading(false);
        }
      };
      register();
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = value
      .split("")
      .filter((char) => char !== "~")
      .slice(0, 4) // Limit the input to 4 characters
      .join("~");

    setVerificationCode(formattedValue);
    setErrors(false); // Clear any previous errors
  };

  const resendCode = async () => {
    setCount(59);
    let phoneNumber = registrationDetails.phoneNumber;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+254" + phoneNumber.slice(1);
    }

    try {
      // delete code from db
      await axios.post(userUrl + "delete_db/", {
        phone_number: phoneNumber,
      });

      // resend code
      await axios.post(userUrl + "send_code/", {
        phone_number: phoneNumber,
      });
    } catch (err) {
      setLoading(false);
      if (err.response.status === 500) {
        setRegistrationDetails({
          ...registrationDetails,
          verificationCode: err.response.data.code,
        });
      }
    }
  };

  useEffect(() => {
    if (count <= 0) {
      setCount(0);
      return;
    }
    const t = setInterval(() => {
      setCount((prevCount) => {
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, [count]);

  return (
    <div>
      <p className="verificationInfo">
        {/* We've sent a verification code to {registrationDetails.phoneNumber} */}
      </p>
      <form onSubmit={handleRegister}>
        <div className="input__container ">
          <div className="input__header row">
            <h3>Your 4 digit-code</h3>
            {!count > 0 && (
              <button type="button" onClick={resendCode} className="resendCode">
                resend code
              </button>
            )}
          </div>
          <input
            type="text"
            name="verificationCode"
            value={registrationDetails.verificationCode}
            onChange={handleChange}
            className={`verificationInput" ${errors ? "border__red" : ""}`}
          />

          {/* errors */}
          {errors && (
            <div className="input__error">
              <p>
                <span>
                  <i>
                    <BsShieldExclamation />
                  </i>
                  <span className="errorMessage">invalid code</span>
                </span>
              </p>
            </div>
          )}
          {serverErrors.status && (
            <div className="input__error">
              <p>
                <span>
                  <i>
                    <BsShieldExclamation />
                  </i>
                  <span className="errorMessage">{serverErrors.message}</span>
                </span>
              </p>
            </div>
          )}
        </div>
        {count > 0 && (
          <p className="resendcode__timer">resend code in {count} seconds</p>
        )}
        <HandleFormBtn
          handleForm={handleRegister}
          loading={loading}
          content="register"
        />
      </form>
    </div>
  );
};

export default LastStep;
