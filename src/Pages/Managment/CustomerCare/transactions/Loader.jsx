import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="TransactionsLoader row">
      <div className="row">
        <TailSpin
          height="40"
          width="40"
          color="red"
          ariaLabel="tail-spin-loading"
          radius="0.5"
          wrapperStyle={{ paddingLeft: "20px" }}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
