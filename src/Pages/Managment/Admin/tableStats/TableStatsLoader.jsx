import React from "react";
import { ColorRing } from "react-loader-spinner";

const TableStatsLoader = () => {
  return (
    <div className="adminLoader">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["red", "red", "red", "red", "red"]}
      />
    </div>
  );
};

export default TableStatsLoader;
