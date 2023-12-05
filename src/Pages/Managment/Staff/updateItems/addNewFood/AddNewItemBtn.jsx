import React from "react";
import { useNavigate } from "react-router-dom";

const AddNewItemBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="updateFood__header row">
      <h2>Items</h2>
      <button
        className="addNewItemBtn"
        type="button"
        onClick={() => {
          navigate("/staff/addnewitem");
        }}
      >
        Add new Item
      </button>
    </div>
  );
};

export default AddNewItemBtn;
