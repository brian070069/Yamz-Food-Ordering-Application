import React from "react";
import UsersHeader from "./UsersHeader";
import AllUsers from "./AllUsers";

const Users = ({ data }) => {
  const { fetchedUsers, userPhoneNumber, users } = data;

  return (
    <div className="users__container">
      <UsersHeader />
      <AllUsers data={{ fetchedUsers, userPhoneNumber, users }} />
    </div>
  );
};

export default Users;
