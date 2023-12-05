import React from "react";

const UserInfo = ({ data }) => {
  return (
    <div className="adminSingle__userInfo">
      <h4>
        <span className="admin__before">Name:</span>
        <span className="admin__after">{data?.first_name}</span>
      </h4>
      <h4>
        <span className="admin__before">Email:</span>
        <span className="admin__after">{data?.email}</span>
      </h4>
      <h4>
        <span className="admin__before">Phone number:</span>
        <span className="admin__after">{data?.phone_number}</span>
      </h4>
    </div>
  );
};

export default UserInfo;
