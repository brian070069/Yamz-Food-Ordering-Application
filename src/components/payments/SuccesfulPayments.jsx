import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const SuccesfulPayments = ({ props }) => {
  const [pieces, setPieces] = useState(500);
  const { width, height } = useWindowSize();
  const { handleShowLocationArea, handleHideRedeemArea, message } = props;

  const stopConfetti = useCallback(() => {
    setTimeout(() => {
      setPieces(0);
    }, 5000);
  }, [pieces]);

  useEffect(() => {
    stopConfetti();
  }, [pieces]);

  return (
    <div className="readyToPay">
      <div className="succesfulPayments">
        <h4>{message} visit your meal history to view your meal</h4>
        <button
          type="button"
          onClick={() => {
            handleShowLocationArea();
            handleHideRedeemArea();
          }}
        >
          finish
        </button>
        <Confetti
          gravity={0.1}
          width={width}
          height={height}
          numberOfPieces={pieces}
        />
      </div>
    </div>
  );
};

export default SuccesfulPayments;
