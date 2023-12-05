import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AvailableFoodsSkeleton = ({ cards }) => {
  return (
    <div className="items__container availableFoodSkeleton__container">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div className="item__container availableItemSkeleton" key={index}>
            <div className="itemImage__container">
              <div className="imageSkeleton">
                <Skeleton height="97%" width="100%" />
              </div>
            </div>
            <div className="item__name row">
              <span className="item__name availableFoodSkeleton__name ">
                <Skeleton width={"60%"} />
              </span>
            </div>
            <div>
              <h4>
                <Skeleton />
              </h4>
              <button>
                <Skeleton />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AvailableFoodsSkeleton;
