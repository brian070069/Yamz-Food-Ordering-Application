import { TailSpin } from "react-loader-spinner";

const HandleFormBtn = ({ handleForm, loading, content }) => {
  return (
    <button
      type="button"
      className={` auth__btn ${loading ? "disabled__btn" : ""}`}
      disabled={loading}
      onClick={handleForm}
    >
      {loading ? (
        <TailSpin
          height="30"
          width="30"
          color="red"
          ariaLabel="tail-spin-loading"
          radius="0.5"
          wrapperStyle={{ paddingLeft: "20px" }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        content
      )}
    </button>
  );
};

export default HandleFormBtn;
