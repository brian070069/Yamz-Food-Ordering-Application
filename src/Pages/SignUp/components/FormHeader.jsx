import React, { useContext } from "react";
import { registrationInfo } from "../../../data/RegistrationInfo";
import RegistrationInfo from "./RegistrationInfo";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { RegisterContext } from "../RegistrationContext";
import { userUrl } from "../../../services/BaseUrls";
import { Link } from "react-router-dom";

const FormHeader = () => {
  const { movePrevForm, currentPage, registrationDetails } =
    useContext(RegisterContext);

  const handlePrevPage = async () => {
    if (currentPage === 3) {
      let phoneNumber = registrationDetails.phoneNumber;

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "254" + phoneNumber.slice(1);
      }
      try {
        const response = await fetch(userUrl + "delete_db/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            phone_number: phoneNumber,
          }),
        });

        if (!response.ok) {
          return;
        }

        movePrevForm();
      } catch (err) {
        console.log("an error occured");
      }
    } else {
      movePrevForm();
    }
  };

  return (
    <div className="auth__info ">
      {currentPage > 0 ? (
        <button className="row" onClick={handlePrevPage}>
          <i>
            <HiArrowSmallLeft />
          </i>
          <h4>Back</h4>
        </button>
      ) : (
        ""
      )}
      {registrationInfo.map((info) => {
        return <RegistrationInfo key={info.Id} {...info} />;
      })}
      {currentPage === 0 && (
        <p>
          Already have an Account?
          <span>
            <Link to={"/login"}>Sign In</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default FormHeader;
