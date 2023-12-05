import React from "react";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";

const Rating = ({ rate, iconSize }) => {
  return (
    <div className="ratings row">
      <i>
        {rate >= 1 ? (
          <MdOutlineStarPurple500 size={iconSize} />
        ) : rate < 1 && rate >= 0.5 ? (
          <MdOutlineStarHalf size={iconSize} />
        ) : (
          <MdOutlineStarBorder size={iconSize} />
        )}
      </i>
      <i>
        {rate >= 2 ? (
          <MdOutlineStarPurple500 size={iconSize} />
        ) : rate < 2 && rate >= 1.5 ? (
          <MdOutlineStarHalf size={iconSize} />
        ) : (
          <MdOutlineStarBorder size={iconSize} />
        )}
      </i>
      <i>
        {rate >= 3 ? (
          <MdOutlineStarPurple500 size={iconSize} />
        ) : rate < 3 && rate >= 2.5 ? (
          <MdOutlineStarHalf size={iconSize} />
        ) : (
          <MdOutlineStarBorder size={iconSize} />
        )}
      </i>
      <i>
        {rate >= 4 ? (
          <MdOutlineStarPurple500 size={iconSize} />
        ) : rate < 4 && rate >= 3.5 ? (
          <MdOutlineStarHalf size={iconSize} />
        ) : (
          <MdOutlineStarBorder size={iconSize} />
        )}
      </i>
      <i>
        {rate >= 5 ? (
          <MdOutlineStarPurple500 size={iconSize} />
        ) : rate < 5 && rate >= 4.5 ? (
          <MdOutlineStarHalf size={iconSize} />
        ) : (
          <MdOutlineStarBorder size={iconSize} />
        )}
      </i>
    </div>
  );
};

export default Rating;
