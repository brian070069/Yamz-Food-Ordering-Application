import React from "react";
import { BiBowlRice, BiCart } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PageLink from "./PageLink";

const AuthenticatedNavigation = () => {
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

export default AuthenticatedNavigation;
