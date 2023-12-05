import React from "react";
import SalesSmallScreen from "./SalesSmallScreen";

const Sales = ({ previousRecords }) => {
  return (
    <>
      {previousRecords.map((record) => {
        return (
          <div key={record.dailyrecord_id}>
            <div className="foodsSold__info">
              <div className="foodStatistics ">
                <div className="foodStatistics__name">{record.food}</div>
                <div className="foodStatistics__premeasuredQuantity">
                  {record.measuredFood}
                </div>
                <div className="foodStatistics__Deficiet">
                  {record.expectedQuantity}
                </div>
                <div className="foodStatistics__GottenAmount">
                  {record.quantity}
                </div>
              </div>
            </div>
            <SalesSmallScreen record={record} />
          </div>
        );
      })}
    </>
  );
};

export default Sales;
