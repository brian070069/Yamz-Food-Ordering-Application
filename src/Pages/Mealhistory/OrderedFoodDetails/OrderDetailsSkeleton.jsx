import React from "react";
import Skeleton from "react-loading-skeleton";

const OrderDetailsSkeleton = () => {
  return (
    <div className="foods__orderedContainer">
      <div className="order__details">
        <div className="order__detailsHeader">
          <div className="order__idContainer row ">
            <button className="row">
              <i>
                <Skeleton width="60px" />
              </i>
            </button>
            <h4 className="orderId">
              <span>
                <Skeleton width="250px" height="25px" />
              </span>
            </h4>
          </div>
          <h5>
            <Skeleton width="300px" height="20px" />
          </h5>
          <div className="order__detailsStatusContainer row">
            <span className="order__detailStatus">
              <Skeleton width="70px" height="19px" />
            </span>
            <div className=" row">
              <span className="order__TotalPrice">
                <Skeleton width="100px" height="16px" />
              </span>
            </div>
          </div>
          <div className="viewQr__buttonContainer row">
            <button>
              <span>
                <Skeleton width="70px" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="food__ordered food__orderedSkeleton">
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
