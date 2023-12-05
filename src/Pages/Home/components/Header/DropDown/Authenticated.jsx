import React, { useEffect, useState } from "react";
import { BiBowlRice, BiCart } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PageLink from "./PageLink";
import { getToken } from "../../../../../libs/getToken";
import jwtDecode from "jwt-decode";

const Authenticated = () => {
  const [token, setDecodedToken] = useState("");

  useEffect(() => {
    const token = getToken("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecodedToken(decodedToken);
    }
  }, []);

  return (
    <nav>
      <div className="authenticated">
        <PageLink name={"home"} icon={<AiOutlineHome />} navigation={"/"} />
        <PageLink
          name={"meal history"}
          icon={<BiBowlRice />}
          navigation={"/mealhistory"}
        />
        <PageLink
          name={"profile"}
          icon={<BsPerson />}
          navigation={"/profile"}
        />
        <PageLink name={"cart"} icon={<BiCart />} navigation={"/cart"} />
        <PageLink
          name={"staff"}
          icon={<MdOutlineAdminPanelSettings />}
          navigation={"/staff"}
        />
        <PageLink
          name={"admin"}
          icon={<MdOutlineAdminPanelSettings />}
          navigation={"/admin"}
        />
        <PageLink
          name={"customer care"}
          icon={<HiOutlineChatBubbleBottomCenterText />}
          navigation={"/customercare"}
        />
      </div>
    </nav>
  );
};

export default Authenticated;
