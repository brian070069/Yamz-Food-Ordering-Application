import React from "react";
import { HiOutlineMinusSm } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const AdjustFoodQuanitityBtn = ({ props }) => {
  const { removeFood, foodQuanity, updateFoodQuantity } = props;
  return (
    <div className="homeRight__adjustItemBtnsContainer row">
      <button
        className="removeItem__btn row"
        type="button"
        onClick={removeFood}
      >
        <i>
          <RxCross2 size={20} />
        </i>
      </button>

      <div className="homeRight__adjustItemBtns row">
        <button
          className="row"
          type="button"
          onClick={() => updateFoodQuantity("subtraction")}
        >
          <i>
            <HiOutlineMinusSm size={20} />
          </i>
        </button>
        <span className="row">{foodQuanity}</span>
        <button
          className="row"
          type="button"
          onClick={() => updateFoodQuantity("addition")}
        >
          <i>
            <IoMdAdd size={20} />
          </i>
        </button>
      </div>
    </div>
  );
};

export default AdjustFoodQuanitityBtn;
