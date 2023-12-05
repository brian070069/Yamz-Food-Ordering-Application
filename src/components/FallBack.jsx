import React from "react";
import { Vortex } from "react-loader-spinner";

const FallBack = () => {
  return (
    <div className="fallBack">
      <h3>qmelter</h3>
      <div className="fallBack__loader ">
        <Vortex
          visible={true}
          height="55"
          width="55"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["green", "green", "green", "green", "green", "green"]}
        />
      </div>
    </div>
  );
};

export default FallBack;
