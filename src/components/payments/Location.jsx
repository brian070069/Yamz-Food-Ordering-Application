import React, { useState } from "react";
import InLineInputError from "../InLineInputError";
import * as yup from "yup";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import HandleFormBtn from "../../components/HandleFormBtn";

const Location = ({ data }) => {
  const { handleHidePaymentArea } = data;
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const orderId = localStorage.getItem("orderedId");

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: { location: "" },
    validationSchema: yup.object().shape({
      location: yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://yuhmz-510557fdfff7.herokuapp.com/menu/order/${orderId}`,
          { name: values.location },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
  });

  return (
    <div className="readyToPay">
      <div className="readyToPay__header row">
        <h4>Enter the location for delivery </h4>
        <button onClick={handleHidePaymentArea}>
          <i>
            <RxCross2 size={20} />
          </i>
        </button>
      </div>
      <div className="inputContainer row">
        <span>Location</span>
        <input
          type="text"
          name="location"
          placeholder="e.g kabarak"
          value={values.location}
          onChange={handleChange}
          errors={errors.location}
          className={errors.location && touched.location ? "border__red" : ""}
        />
        <InLineInputError touched={touched.location} errors={errors.location} />
      </div>

      <div className="payment__buttons row">
        {/* <button>cancel</button> */}
        <HandleFormBtn
          handleForm={handleSubmit}
          loading={loading}
          content={"continue"}
        />
      </div>
    </div>
  );
};

export default Location;
