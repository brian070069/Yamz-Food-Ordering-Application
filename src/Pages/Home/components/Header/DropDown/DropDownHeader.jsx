import React from "react";
import { RxCross2 } from "react-icons/rx";

const DropDownHeader = ({ data }) => {
  const { toogleDropDown } = data;
  return (
    <div className="dropDown__header row">
      <button onClick={toogleDropDown}>
        <i>
          <RxCross2 />
        </i>
      </button>
    </div>
  );
};

export default DropDownHeader;
