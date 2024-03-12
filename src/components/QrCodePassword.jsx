import { useFormik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import InLineInputError from "./InLineInputError";

const QrCodePassword = () => {
  const { values, errors, touched, handleChange } = useFormik({
    initialValues: {
      password: "",
    },
  });
  return (
    <div className="payments px-4">
      <div className="readyToPay max-w-[500px] mx-auto my-28 bg-[#192433]">
        <div className="readyToPay__header row">
          <h4>Enter Your Password </h4>
          <button onClick={() => {}}>
            <i>
              <RxCross2 size={20} />
            </i>
          </button>
        </div>
        <div className="inputContainer row">
          <span>
            To view your meal qrcode you must enter the password for this
            account for security purposes
          </span>
          <input
            type="text"
            name="phoneNumber"
            placeholder="e.g 074077467"
            value={values.password}
            onChange={handleChange}
            errors={errors.password}
            className={errors.password && touched.password ? "border__red" : ""}
          />
          <InLineInputError
            touched={touched.password}
            errors={errors.password}
          />
        </div>

        <div className="payment__buttons row">
          {/* <button>cancel</button> */}
          <button type="button" className="text-black" onClick={() => {}}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodePassword;
