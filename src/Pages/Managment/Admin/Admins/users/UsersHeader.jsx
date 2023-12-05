import React from "react";

const UsersHeader = () => {
  return (
    <div className="user__containerHeader">
      <h3 className="usersName">Name</h3>
      <div>
        <h3 className="usersPhoneNumber">Phone Number</h3>
      </div>
      <div>
        <h3 className="usersPhoneNumber">isAdmin</h3>
      </div>
      <div>
        <h3 className="usersPhoneNumber">staff</h3>
      </div>
    </div>
  );
};

export default UsersHeader;
