import React from "react";

const PreMeasuredFoodHeader = () => {
  return (
    <div className="preMeasuredFood__header ">
      <div className="preMeasuredFood__name">Name</div>
      <div className="preMeasuredFood__quantity row">Measured Quantity</div>
      <div className="preMeasuredFood__quantity row">Expected Portions</div>
    </div>
  );
};

export default PreMeasuredFoodHeader;
