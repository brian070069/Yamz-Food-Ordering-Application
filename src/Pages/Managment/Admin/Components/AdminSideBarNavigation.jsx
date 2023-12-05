import React from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import { Link } from "react-router-dom";

const AdminSideBarNavigation = ({ toggleSideBar }) => {
  return (
    <div className="adminNavigation__container">
      <div className="adminNavigation">
        <div className="adminNavigation__navListContainer">
          <div className="adminNavigation__navListContainerHeader row">
            <button onClick={toggleSideBar}>
              <RxCross2 size={25} />
            </button>
            <div className="row">
              <img
                src="	https://ik.imagekit.io/kzmqi6dbk/logo2_6VhjzQesV?updatedAt=1689687652550"
                alt="logo"
              />
            </div>
          </div>
          <div className="adminNavigation__listContainer">
            <div className="adminNavigation__list ">
              <Link to={"/admin"} className="adminLinks row">
                <span className="adminLinks__icon">
                  <FcSalesPerformance size={22} />
                </span>
                Sales Table
              </Link>
              <Link to={"/admin/measuredquantities"} className="adminLinks row">
                <span className="adminLinks__icon">
                  <TbRulerMeasure size={22} />
                </span>
                Measured Quantities
              </Link>
              <Link to={"/admin/users"} className="adminLinks row">
                <span className="adminLinks__icon">
                  <PiUsersThreeDuotone size={22} />
                </span>
                Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBarNavigation;
