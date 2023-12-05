import React from "react";

const SalesSmallScreen = ({ record }) => {
  return (
    <div className="foodsSold__info foodsSold__infoSmallScreen">
      <div className="foodStatistics__smallScreenContainer">
        <div className="foodStatistics__smallScreen row">
          <h4>item</h4>
          <div className="foodStatistics__name">{record.food}</div>
        </div>
        <div className="foodStatistics__smallScreen row">
          <h4>measured Quantity</h4>
          <div className="foodStatistics__premeasuredQuantity">
            {record?.measuredFood ? record.measuredFood : "?"}
          </div>
        </div>
        <div className="foodStatistics__smallScreen row">
          <h4>portions</h4>
          <div className="foodStatistics__Deficiet">
            {record?.expectedQuantity ? record.expectedQuantity : "?"}
          </div>
        </div>
        <div className="foodStatistics__smallScreen row">
          <h4>sales(ksh)</h4>
          <div className="foodStatistics__GottenAmount">{record.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default SalesSmallScreen;
