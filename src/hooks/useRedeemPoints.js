import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ACTION } from "../Pages/Home/HomeReducer";
import { mpesaBaseUrl } from "../services/BaseUrls";

export const useRedeemPoints = () => {
  const [, dispatch] = useContext(CartContext);
  const [showRedeemingPhoneNumberArea, setShowRedeemingPhoneNumberArea] =
    useState(true);
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);
  const [redeemedSuccesfully, setRedeemedSuccesfully] = useState(false);
  const [failedToRedeem, setFailedToRedeem] = useState(false);
  const [redeemErrorMessage, setReedeemErrorMessage] = useState("");
  const navigate = useNavigate("");

  const handleHideRedeemArea = () => {
    setReedeemErrorMessage("");
    setShowRedeemingPhoneNumberArea(true);
    setIsRedeemingPoints(false);
    setRedeemedSuccesfully(false);
    setFailedToRedeem(false);
  };

  const redeemPoints = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      localStorage.clear();
      return;
    }
    try {
      setShowRedeemingPhoneNumberArea(false);
      setIsRedeemingPoints(true);
      const response = await axios.post(mpesaBaseUrl + "redeem/", "", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      setIsRedeemingPoints(false);

      const data = response.data;
      if (data?.message) {
        dispatch({ type: ACTION.CLEARCART });
        setRedeemedSuccesfully(true);
      } else if (data?.error) {
        setFailedToRedeem(true);
        setRedeemedSuccesfully(false);
        setReedeemErrorMessage(data.error);
      }
    } catch (err) {
      setFailedToRedeem(true);
      setShowRedeemingPhoneNumberArea(false);
      setIsRedeemingPoints(false);
      setReedeemErrorMessage(
        "an error occured while redeeming please try again"
      );
    }
  };

  return {
    redeemPoints,
    isRedeemingPoints,
    showRedeemingPhoneNumberArea,
    redeemedSuccesfully,
    failedToRedeem,
    redeemErrorMessage,
    handleHideRedeemArea,
  };
};
