import React from "react";
import { Dna } from "react-loader-spinner";

const ProcessingPayments = ({ message }) => {
  return (
    <div className="readyToPay">
      <div className="processingPayments">
        <h3>Don`t refresh page</h3>
        <h4>{message}</h4>
        <span>
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </span>
      </div>
    </div>
  );
};

export default ProcessingPayments;
