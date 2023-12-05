import React from "react";
import { RxCross2 } from "react-icons/rx";
import { LuChevronsRight } from "react-icons/lu";

const PointsInfo = ({ data }) => {
  const { tooglePointsInfo } = data;
  return (
    <div className="pointsInfo__container">
      <div className="pointsInfo__header row">
        <button type="button" onClick={tooglePointsInfo}>
          <RxCross2 size={22} />
        </button>
      </div>
      <div className="pointsDesc__container">
        <div className="pointsDesc">
          <h3>What Are Points?</h3>
          <div className="pointsDescInfo">
            <p>
              <span>
                <LuChevronsRight size={22} />
              </span>
              Points are a special currency in our application designed to help
              you when your preferred food is not available. Here's how they
              work:
            </p>
          </div>
        </div>
        <div className="pointsDesc">
          <h3>Earning Points:</h3>
          <div className="pointsDescInfo">
            <p>
              <span>
                <LuChevronsRight size={22} />
              </span>
              You earn points as you use our app, order meals, or take specific
              actions. The more you engage, the more points you accumulate.
            </p>
          </div>
        </div>
        <div className="pointsDesc">
          <h3>Redeeming Points:</h3>
          <div className="pointsDescInfo">
            <p>
              <span>
                <LuChevronsRight size={22} />
              </span>
              When a food item you desire isn't available, you can use your
              points to convert them into the monetary value of that meal. It's
              like having a backup plan for your cravings!
            </p>
            <p>
              <span>
                <LuChevronsRight size={22} />
              </span>
              <i className="minimumRedemable__pointsContainer">
                Please note that the minimum amount of points you need to redeem
                is <span className="minimumRedemable__points">50 points</span> ,
                which is worth
                <span className="minimumRedemable__points"> 35 shillings</span>.
                So, you can start redeeming once you reach this threshold.
              </i>
            </p>
          </div>
        </div>
        <div className="pointsDesc">
          <h3>Why Points Matter:</h3>
          <div className="pointsDescInfo">
            <p>
              <span>
                <LuChevronsRight size={22} />
              </span>
              Points ensure you never leave empty-handed, even when your
              favorite dish isn't on the menu. They're your ticket to enjoying a
              delicious alternative without spending extra money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsInfo;
