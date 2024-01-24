import { useContext, useState } from "react";
import { userUrl } from "../../../../services/BaseUrls";
import axios from "axios";
import { toast } from "react-toastify";
import { RegisterContext } from "../../RegistrationContext";

export const useRegisterFirstStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [doesUserExist, setDoesUserExist] = useState(false);
  const { moveNextPage, setRegistrationDetails, registrationDetails } =
    useContext(RegisterContext);

  const handleRegister = async (values) => {
    let phoneNumber = values.phoneNumber;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+254" + phoneNumber.slice(1);
    }
    setIsLoading(true);
    try {
      await axios.post(
        userUrl + "check_phone_number/",
        { phone_number: phoneNumber },
        {
          headers: { "content-type": "application/json" },
        }
      );
      setIsLoading(false);
      setDoesUserExist(false);
      moveNextPage();
      setRegistrationDetails({
        ...registrationDetails,
        phoneNumber: values.phoneNumber,
      });
    } catch (error) {
      setIsLoading(false);
      if (!error.response) {
        toast.error("failed to contact server please try again", {
          position: "top-center",
          theme: "dark",
        });
      } else if (error.request.status === 400) {
        setDoesUserExist(true);
      } else {
        toast.error("an error occured please try again", {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };

  return { handleRegister, isLoading, doesUserExist };
};

export const useRegisterThirdStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { moveNextPage, setRegistrationDetails, registrationDetails } =
    useContext(RegisterContext);

  const handleRegister = async (values) => {
    setIsLoading(true);
    let phoneNumber = registrationDetails.phoneNumber;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+254" + phoneNumber.slice(1);
    }

    try {
      const response = await axios.post(
        userUrl + "send_code/",
        { phone_number: phoneNumber },
        {
          headers: { "content-type": "application/json" },
        }
      );
      const data = response.data;
      // setIsLoading(false);
      // moveNextPage();
      // setRegistrationDetails({
      //   ...registrationDetails,
      //   password: values.password,
      //   verificationCode: data.verification_code,
      // });
    } catch (error) {
      setIsLoading(false);

      if (!error.response) {
        toast.error("failed to contact server please try again", {
          position: "top-center",
          theme: "dark",
        });
      } else if (error.response.status === 500) {
        setIsLoading(false);
        moveNextPage();
        setRegistrationDetails({
          ...registrationDetails,
          password: values.password,
          verificationCode: error.response.data.code,
        });
      } else {
        toast.error("an error occured please try again", {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };

  return { handleRegister, isLoading };
};
