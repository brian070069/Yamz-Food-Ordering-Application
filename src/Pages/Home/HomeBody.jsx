import React from "react";
import HomeLeft from "./components/HomeLeft/HomeLeft";
import HomeRight from "./components/HomeRight/Index";

const HomeBody = () => {
  return (
    <div className="home__body">
      <HomeLeft />
      <HomeRight />
    </div>
  );
};

export default HomeBody;
