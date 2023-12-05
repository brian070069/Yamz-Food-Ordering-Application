import React, { useCallback, useContext, useState } from "react";
import svg from "../../../../assets/profile.svg";
import DropDown from "./DropDown/DropDown";
import { AuthenticationContext } from "../../../../context/authContext.";

const HeaderRight = () => {
  const [dropDownIsShow, setDropDownIsShown] = useState(false);
  const { image, isImageUploaded, userInfo, isAuthenticated, extraUserInfo } =
    useContext(AuthenticationContext);

  const toogleDropDown = useCallback(() => {
    setDropDownIsShown((prevValue) => {
      return !prevValue;
    });
  }, [dropDownIsShow]);

  return (
    <div className="header__right row">
      <div className="row">
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
            {dropDownIsShow && <DropDown data={{ toogleDropDown }} />}
          </div>
          {isAuthenticated && (
            <div className="header__rightUserInfo row">
              <span className="header__rightName">{userInfo.first_name}</span>
              <span>{userInfo.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderRight;
