import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ACTION } from "../Pages/Home/HomeReducer";
import { mpesaBaseUrl } from "../services/BaseUrls";
import { getToken } from "../libs/getToken";

const sendStkPushUrl = mpesaBaseUrl + "send/";

export const useMpesaPayment = () => {
  const { mpesaPostRequest } = useMpesaPostService();
  const [, dispatch] = useContext(CartContext);

  const [showLocationArea, setShowLocationArea] = useState(false);
  const [showPaymentArea, setShowPaymentArea] = useState(false);
  const [showPhoneNumber, setShowPhoneNumberBar] = useState(true);
  const navigate = useNavigate();

  //payments
  const [isProcessingPayments, setIsProcessingPayment] = useState(false);
  const [isPaymentSucessful, setIsPaymentSuccesful] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [paymentErrorMessages, setPaymentErrorMessages] = useState("");

  // server errors
  const [isServerErrors, setServerErrors] = useState(false);
  const [serverErrorMessages, setServerErrorMessages] = useState("");

  //handleDispayMpesaArea
  const handleShowLocationArea = () => {
    setShowPaymentArea(true);
    setShowLocationArea(true);
    setIsPaymentSuccesful(false);
    setShowPhoneNumberBar(false);
  };

  const handleDispalyPaymentArea = () => {
    setShowPaymentArea(true);
    setShowLocationArea(false);
    setShowPhoneNumberBar(true);
  };

  const handleHidePaymentArea = () => {
    setIsProcessingPayment(false);
    setIsPaymentSuccesful(false);
    setIsPaymentFailed(false);
    setShowPaymentArea(false);
    setShowPhoneNumberBar(true);
    setServerErrors(false);
  };

  // handle payment
  const handleMpesaPayment = async (phone_number) => {
    try {
      //transaction has started
      setShowPhoneNumberBar(false);
      setIsProcessingPayment(true);
      // send stk push message
      const stkPushData = await mpesaPostRequest(
        sendStkPushUrl,
        phone_number,
        "phone_number"
      );
      console.log(stkPushData);
      setIsProcessingPayment(false);
      if (stkPushData?.response?.result === "0") {
        setIsPaymentSuccesful(true);
        localStorage.setItem("orderedId", stkPushData?.order_id);
        dispatch({ type: ACTION.CLEARCART });
      } else {
        setIsPaymentFailed(true);
        setPaymentErrorMessages("Payment Failed");
        dispatch({ type: ACTION.CLEARCART });
      }
    } catch (err) {
      setServerErrors(true);
      setIsProcessingPayment(false);
      setIsPaymentFailed(true);
      dispatch({ type: ACTION.CLEARCART });
      if (!err.response) {
        setServerErrorMessages("failed to contact the server please try again");
      } else if (err.result.status === 400) {
        setServerErrorMessages("request failed please try again");
        dispatch({ type: ACTION.CLEARCART });
      } else if (err.result.status === 401) {
        localStorage.clear();
        navigate("/login", { replace: true });
      } else if (err.result.status === 503) {
        console.log(err);
        return;
      } else {
        setServerErrorMessages("an error occured please try again");
      }
    }
  };

  return {
    handleMpesaPayment,
    handleShowLocationArea,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showLocationArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    paymentErrorMessages,
    isPaymentSucessful,
    isServerErrors,
    serverErrorMessages,
  };
};

const useMpesaPostService = () => {
  const navigate = useNavigate();

  const mpesaPostRequest = async (url, bodyData, bodyParamName) => {
    const token = getToken("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const requestData = {
        [bodyParamName]: bodyData,
      };

      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      // err
    }
  };

  return { mpesaPostRequest };
};
