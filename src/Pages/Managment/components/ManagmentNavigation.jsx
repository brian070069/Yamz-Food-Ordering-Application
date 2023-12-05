import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosQrScanner } from "react-icons/io";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const ManagmentNavigation = () => {
  return (
    <div className="homeLeft__nav mobile__view">
      <div className="authenticated row  nav__mobile">
        <Link to="/staff/orders">
          <i>
            <MdOutlineTipsAndUpdates size={21} />
          </i>
          <span>orders</span>
        </Link>
        <Link to="/staff/addnewitem">
          <i>
            <AiOutlineAppstoreAdd size={21} />
          </i>
          <span>New item</span>
        </Link>
      </div>
    </div>
  );
};

export default ManagmentNavigation;
