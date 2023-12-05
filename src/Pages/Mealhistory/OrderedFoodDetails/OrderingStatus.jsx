import React from "react";

const OrderingStatus = ({ icon, animation, label }) => {
  return (
    <div className="deliveryStatus_status">
      <div className="deliveryStatus row">
        <span
          className={`deliveringIcon ${animation && "deliveringAnimation"}`}
        >
          {icon || animation}
        </span>
        <span className={`${label === "cancelled" && "deliveryCanceled"}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default OrderingStatus;
