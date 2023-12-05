import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const AdminUserHeader = ({ handleInputChange, userPhoneNumber, users }) => {
  return (
    <div className="adminSearchUser__container staffHeader row">
      <div className="adminUser__input row">
        <input
          type="text"
          placeholder="search by phone number"
          value={userPhoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="numberOfusers row">{users && <h4>{users} users</h4>}</div>
    </div>
  );
};

export default AdminUserHeader;
