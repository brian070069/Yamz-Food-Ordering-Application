import { TailSpin } from "react-loader-spinner";

const BigCartLoader = () => {
  return (
    <div className="bigCartAdjustFood__loader row">
      <TailSpin
        height="20"
        width="20"
        color="red"
        ariaLabel="tail-spin-loading"
        radius="0.5"
        wrapperStyle={{ paddingLeft: "20px" }}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default BigCartLoader;
