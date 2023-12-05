import axios from "axios";
import React from "react";
import HandleFormBtn from "../../../../../components/HandleFormBtn";
import { userUrl } from "../../../../../services/BaseUrls";

const UserStatus = ({ userInfo }) => {
  const { data, userStatus, setUserStatus } = userInfo;

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [name]: checked,
    }));
  };

  //change user status
  const changeUserStatus = async () => {
    const url = userUrl + `user/${data?.id}/`;
    const changeStatusData = {
      is_admin: userStatus.isAdmin,
      is_staff: userStatus.isStaff,
      is_ccare: userStatus.isCustomerCare,
    };

    try {
      const response = await axios.patch(url, changeStatusData, {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* admin */}
      <div className="userStatus">
        <div className="userStatus__Header row">
          <h4>Admin</h4>
          <h4>{data.is_admin ? "true" : "false"}</h4>
        </div>
        <div className="adminAdd row">
          <div>{data.is_admin ? "remove" : "add"}</div>
          <input
            type="checkbox"
            name="isAdmin"
            checked={userStatus?.isAdmin}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* staff */}
        <div className="userStatus__Header row">
          <h4>Staff</h4>
          <h4>{data.is_staff ? "true" : "false"}</h4>
        </div>
        <div className="adminAdd row">
          <div>{data.is_staff ? "remove" : "add"}</div>
          <input
            type="checkbox"
            name="isStaff"
            checked={userStatus?.isStaff}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* customer care */}
        <div className="userStatus__Header row">
          <h4>Customer Care</h4>
          <h4>{data.is_ccare ? "true" : "false"}</h4>
        </div>
        <div className="adminAdd row">
          <div>{data.is_ccare ? "remove" : "add"}</div>
          <input
            type="checkbox"
            name="isCustomerCare"
            checked={userStatus?.isCustomerCare}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="adminAdd__statusBtn row">
          <HandleFormBtn content="update" handleForm={changeUserStatus} />
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
