import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { userUrl } from "../../../../../services/BaseUrls";
import AdminUserHeader from "./AdminUserHeader";
import Users from "./Users";
import TableStatsLoader from "../../tableStats/TableStatsLoader";
import Header from "../../../../Home/components/Header/Header";
import SideBarButton from "../../Components/SideBarButton";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [isSideBarshow, setIsSideBarShow] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const { fetchedItems: fetchedUsers, isLoading } = useFetch(
    userUrl + "registration/",
    false
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserPhoneNumber(value);
  };

  const toggleSideBar = () => {
    setIsSideBarShow((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      //returns admin users first
      const sortedUsers = fetchedUsers.sort((a, b) => (b.is_admin ? 1 : -1));
      setUsers(sortedUsers);
    }
  }, [fetchedUsers]);

  return (
    <div className="adminUser__DetailsContainer admin__container">
      <Header />
      <SideBarButton data={{ toggleSideBar, isSideBarshow }} />
      <div className="adminUser__details">
        <AdminUserHeader
          handleInputChange={handleInputChange}
          userPhoneNumber={userPhoneNumber}
          users={users.length}
        />
        {isLoading ? (
          <TableStatsLoader />
        ) : (
          <Users data={{ fetchedUsers, userPhoneNumber, users }} />
        )}
      </div>
    </div>
  );
};

export default Index;
