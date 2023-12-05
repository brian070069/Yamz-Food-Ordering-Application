import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserStatus from "./UserStatus";
import { useFetch } from "../../../../../hooks/useFetch";
import { userUrl } from "../../../../../services/BaseUrls";
import { useParams } from "react-router-dom";
import Header from "../../../../Home/components/Header/Header";
import SideBarButton from "../../Components/SideBarButton";

const Index = () => {
  const { id } = useParams();
  const [specificUser, setSpecificUser] = useState({});
  const [userStatus, setUserStatus] = useState({
    isAdmin: false,
    isStaff: false,
    isCustomerCare: false,
  });
  const { fetchedItems: fetchedUsers, isLoading } = useFetch(
    userUrl + "registration/",
    false
  );

  const toggleSideBar = () => {
    setIsSideBarShow((prevStatus) => !prevStatus);
  };

  const [isSideBarshow, setIsSideBarShow] = useState(false);

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      // extract users
      console.log(fetchedUsers);
      const user = fetchedUsers.find((user) => {
        return user?.id === +id;
      });

      if (!user) {
        console.log("user not found");
        return;
      }
      setSpecificUser(user);
      setUserStatus({
        isAdmin: user?.is_admin,
        isStaff: user?.is_ccare,
        isCustomerCare: user?.is_staff,
      });
    }
  }, [fetchedUsers]);

  return (
    <div className="admin__container">
      <Header />
      <SideBarButton data={{ toggleSideBar, isSideBarshow }} />
      <div className="adminSingle__userContainer">
        <div className="adminSingle__user">
          <UserInfo data={specificUser} />
          <UserStatus
            userInfo={{
              data: specificUser,
              userStatus,
              isLoading,
              setUserStatus,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
