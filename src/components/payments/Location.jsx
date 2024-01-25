import React, { useState } from "react";
import InLineInputError from "../InLineInputError";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import HandleFormBtn from "../../components/HandleFormBtn";
import { cartBaseUrl } from "../../services/BaseUrls";

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
        const response = await axios.patch(
          `${cartBaseUrl}${orderId}/`,
          { location: values.location },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        handleHidePaymentArea();
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
