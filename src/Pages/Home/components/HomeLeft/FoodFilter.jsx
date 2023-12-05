import React from "react";
import { BiChevronDown } from "react-icons/bi";

const FoodFilters = () => {
  return (
    <div className="food__filters">
      <h3>Our Foods</h3>
      <div className="filter row">
        <h3>All foods</h3>
        <div className="categories">
          <button className="picker row">
            <h4>ALL</h4>
            <i>
              <BiChevronDown />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodFilters;
