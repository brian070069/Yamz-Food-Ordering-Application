// import { BsFillBasket2Fill, BsPerson } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiBowlRice } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";

const HomeLeftLinks = () => {
  const [state] = useContext(CartContext);
  return (
    <div className="homeLeft__nav mobile__view">
      <div className="authenticated row  nav__mobile">
        <Link to="/">
          <i>
            <AiOutlineHome size={25} />
          </i>
          <span>home</span>
        </Link>
        <Link to="/mealhistory">
          <i>
            <BiBowlRice size={25} />
          </i>
          <span>meal</span>
        </Link>
        <Link to="/cart">
          <i>
            <HiOutlineShoppingCart size={25} />
            <div className="counter notification__counter">
              {state.cartItems.length}
            </div>
          </i>
        </Link>
        <Link to="/profile">
          <i>
            <BsPerson size={25} />
          </i>
          <span>profile</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeLeftLinks;
