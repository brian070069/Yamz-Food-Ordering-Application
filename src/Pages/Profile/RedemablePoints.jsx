import React from "react";

const RedemablePoints = ({ data }) => {
  const { tooglePointsInfo, points } = data;

  return (
    <div className="userPoints row">
      <div className="currentPoints">{!points ? "...." : points} pts </div>
      <button
        className="pointsInfoBtn"
        type="button"
        onClick={tooglePointsInfo}
      >
        points info
      </button>
    </div>
  );
};

export default RedemablePoints;
