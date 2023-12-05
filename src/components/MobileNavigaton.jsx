// import { BsFillBasket2Fill, BsPerson } from "react-icons/bs";
import { BiBowlRice } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const HomeLeftLinks = ({ toggleModal }) => {
  return (
    <div className="portfolioNav">
      <div className="authenticated row  nav__mobile">
        <Link to="/">
          <i>
            <AiOutlineHome size={24} />
          </i>
          <span>home</span>
        </Link>
        <Link to="/" onClick={toggleModal}>
          <i>
            <BiBowlRice size={24} />
          </i>
          <span>Contact</span>
        </Link>
        <Link to="/about">
          <i>
            <BiBowlRice size={24} />
          </i>
          <span>About</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeLeftLinks;
