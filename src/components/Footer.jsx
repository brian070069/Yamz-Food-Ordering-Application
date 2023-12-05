import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer row">
      <div className="footer__left">
        <span>@2023 qmelter.com</span>
      </div>
      <div className="footer__right row">
        <Link>
          <FaXTwitter size={19} />
        </Link>
        <Link>
          <BsInstagram size={19} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
