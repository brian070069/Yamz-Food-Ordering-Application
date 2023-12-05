import React, { useCallback, useContext, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import SignOut from "./SignOut";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import RedemablePoints from "./RedemablePoints";
import PointsInfo from "./PointsInfo";
import { AuthenticationContext } from "../../context/authContext.";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import HomeLeftLinks from "../Home/components/mobile/HomeLeftLinks";

const Profile = () => {
  useRequireAuth();
  const {
    image,
    setImage,
    isImageUploaded,
    isAuthenticated,
    userInfo,
    extraUserInfo,
    profileImageToTrue,
  } = useContext(AuthenticationContext);
  const [showPointsInfo, setShowPointsInfo] = useState(false);

  const tooglePointsInfo = useCallback(() => {
    setShowPointsInfo((prev) => {
      return !prev;
    });
  }, [showPointsInfo]);

  return (
    <div className="profile">
      <Header />
      <section className="profile__body">
        <PersonalInfo
          data={{
            image,
            setImage,
            isAuthenticated,
            firstName: userInfo.first_name,
            phoneNumber: userInfo.phone_number,
            email: userInfo.email,
            profilePicture: extraUserInfo.profilePicture,
            profilePicStatus: {
              isImageUploaded,
              profileTrue: profileImageToTrue,
            },
          }}
        />
        <RedemablePoints
          data={{ tooglePointsInfo, points: extraUserInfo.qPoints }}
        />
        {showPointsInfo && <PointsInfo data={{ tooglePointsInfo }} />}
        <div className="change__password row">
          <Link to="/changepassword">change password</Link>
          <SignOut />
        </div>
      </section>
      <HomeLeftLinks />
    </div>
  );
};

export default Profile;
