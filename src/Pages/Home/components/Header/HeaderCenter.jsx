import React, { useContext } from "react";
import { BiBasket, BiSearch } from "react-icons/bi";
import { CartContext } from "../../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const HeaderCenter = () => {
  const [state] = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="header__center row">
      <section className="row">
        <input
          type="text"
          placeholder="search..."
          className="headerCenter__input"
        />
        <button className="searchItem__headerBtn row" type="button">
          <i>
            <BiSearch size={22} />
          </i>
        </button>
      </section>
      <button
        className="headerCenter_navigateBtn"
        type="button"
        onClick={() => navigate("/cart")}
      >
        <span className="counter row">{state.cartItems.length}</span>
        <BiBasket size={23} />
      </button>
    </div>
  );
};

export default HeaderCenter;
