import React from "react";
import PageLink from "./PageLink";
import { IoLogInOutline } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";

const NotAuthenticated = () => {
  return (
    <nav>
      <div className="authenticated">
        <PageLink
          name={"login"}
          navigation={"/login"}
          icon={<IoLogInOutline />}
        />
        <PageLink
          name={"register"}
          navigation={"/register"}
          icon={<SiGnuprivacyguard />}
        />
      </div>
    </nav>
  );
};

export default NotAuthenticated;
