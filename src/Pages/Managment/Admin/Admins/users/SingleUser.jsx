import React from "react";
import { Link } from "react-router-dom";

const SingleUser = ({ user }) => {
  return (
    <Link to={`/admin/users/${user?.id}`} className="usersAdmin">
      <h4 className="usersAdmin__name">{user.first_name}</h4>
      <div>
        <h4 className="usersAdmin__phoneNumber">{user?.phone_number}</h4>
      </div>
      <div>
        <h4 className="usersAdmin__status">
          <span
            className={`${
              user?.is_admin && "usersAdmin__statusHigherResponsibility"
            }`}
          >
            {user?.is_admin ? "true" : "false"}
          </span>
        </h4>
      </div>
      <div>
        <h4 className="usersAdmin__status">
          <span
            className={`${
              user?.is_staff && "usersAdmin__statusHigherResponsibility"
            }`}
          >
            {user?.is_staff ? "true" : "false"}
          </span>
        </h4>
      </div>
    </Link>
  );
};

export default SingleUser;
