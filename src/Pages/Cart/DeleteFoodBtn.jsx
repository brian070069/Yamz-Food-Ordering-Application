import { RxCross2 } from "react-icons/rx";
import BigCartLoader from "./BigCartLoader";

const DeleteFood = ({ props }) => {
  const { deleteFood, deleteFoodloader, price } = props;
  return (
    <>
      {deleteFoodloader ? (
        <BigCartLoader />
      ) : (
        <div className="price__removeFoodBtn">
          <p>sh {price}</p>
          <button
            type="button"
            className="remove__food row"
            onClick={deleteFood}
          >
            <i>
              <RxCross2 size={17} />
            </i>
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteFood;
