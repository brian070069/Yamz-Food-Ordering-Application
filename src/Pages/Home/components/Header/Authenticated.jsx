import React, { useCallback, useContext, useState } from "react";
import svg from "../../../../assets/profile.svg";
import { AuthenticationContext } from "../../../../context/authContext.";
import DropDown from "./DropDown/DropDown";

const Authenticated = () => {
  const [dropDownIsShown, setDropDownIsShown] = useState(false);
  const { image, isImageUploaded, userInfo, isAuthenticated, extraUserInfo } =
    useContext(AuthenticationContext);

  const toogleDropDown = useCallback(() => {
    setDropDownIsShown((prevValue) => {
      return !prevValue;
    });
  }, [dropDownIsShown]);

  return (
    <div className="header__rightNavigation row">
      <div className="header__rightProfileContainer">
        <img
          src={
            isImageUploaded && isAuthenticated
              ? image || extraUserInfo.profilePicture
              : svg
          }
          onClick={toogleDropDown}
        />
        {dropDownIsShown && <DropDown data={{ toogleDropDown }} />}
      </div>
      {
        <div className="header__rightUserInfo row">
          <span className="header__rightName">{userInfo.first_name}</span>
          <span>{userInfo.email}</span>
        </div>
      }
    </div>
  );
};

export default Authenticated;
