import React, { useContext } from "react";
import { AuthenticationContext } from "../../../../context/authContext.";
import NotAuthenticated from "./NotAuthenticated";
import Authenticated from "./Authenticated";

const HeaderRight = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <div className="header__right row">
      <div className="row">
        {!isAuthenticated ? <NotAuthenticated /> : <Authenticated />}
      </div>
    </div>
  );
};

export default HeaderRight;
