import { TailSpin } from "react-loader-spinner";

const CartLoader = () => {
  return (
    <div className="adjust__cartFood cartLoader">
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

export default CartLoader;
