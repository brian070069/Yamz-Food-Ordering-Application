import React from "react";
import { Link } from "react-router-dom";
import { TbReorder } from "react-icons/tb";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const SideBar = () => {
  return (
    <section className="sideBar__navigation">
      <div className="staff__info">
        <h3>brian Gatundu</h3>
      </div>
      <div className="staff__navigation">
        <Link to="/staff/orders" className="navigation__link">
          <span className="sideBar__icon ">
            <TbReorder size={21} />
          </span>
          <span className="sideBar__name">orders</span>
        </Link>
        <Link to="/staff" className="navigation__link">
          <span className="sideBar__icon">
            <MdOutlineTipsAndUpdates size={21} />
          </span>
          <span className="sideBar__name">update items</span>
        </Link>
        <Link to="/staff/addnewitem" className="navigation__link">
          <span className="sideBar__icon">
            <AiOutlineAppstoreAdd size={21} />
          </span>
          <span className="sideBar__name">Add new Item</span>
        </Link>
      </div>
    </section>
  );
};

export default SideBar;
