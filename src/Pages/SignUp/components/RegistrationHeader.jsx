import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { RegisterContext } from "../RegistrationContext";
import { Link, useNavigate } from "react-router-dom";

const RegistartionHeader = () => {
  const { currentPage } = useContext(RegisterContext);
  const navigate = useNavigate();

  //change width of progress bar
  const progressBarWidth = () =>
    currentPage >= 3 ? 100 : currentPage >= 2 ? 70 : currentPage >= 1 ? 37 : 0;

  //show already filled registration forms
  const showDoneWithForms = (page) => {
    if (currentPage >= page) {
      return "formFilled";
    } else {
      return "form__notFilled";
    }
  };

  return (
    <section className=" simpleHeader registration__header row">
      <Link to={"/"}>
        <img src="vite.svg" alt="logo" />
      </Link>
      <div className="progress">
        <div className="progress__bar">
          <div
            className="bar"
            style={{ width: `${progressBarWidth()}%` }}
          ></div>
        </div>
        <div className="progress__barInfo row">
          <span className={showDoneWithForms(0)}>phone number</span>
          <span className={showDoneWithForms(1)}>personal info</span>
          <span className={showDoneWithForms(2)}>password</span>
          <span className={showDoneWithForms(3)}>verfication</span>
        </div>
      </div>

      <button onClick={() => navigate("/")}>
        <i>
          <RxCross2 />
        </i>
      </button>
    </section>
  );
};

export default RegistartionHeader;
