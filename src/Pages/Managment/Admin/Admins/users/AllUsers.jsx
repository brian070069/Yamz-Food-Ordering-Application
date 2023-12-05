import React from "react";
import SingleUser from "./SingleUser";

const AllUsers = ({ data }) => {
  const { fetchedUsers, userPhoneNumber, users } = data;
  const fetchedUsersLength = fetchedUsers.length > 0;

  return (
    <div className="usersAdmin__container">
      {fetchedUsersLength &&
        users
          .filter((user) => {
            return userPhoneNumber === ""
              ? users
              : user.phone_number.includes(userPhoneNumber);
          })
          .map((user) => {
            return <SingleUser key={user.phone_number} user={user} />;
          })}
    </div>
  );
};

export default AllUsers;
