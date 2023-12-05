import React, { useContext } from "react";
import { personalInfoValidationSchema } from "../../RegistrationValidation";
import InLineInputError from "../../../../components/InLineInputError";
import { RegisterContext } from "../../RegistrationContext";
import { useFormik } from "formik";
import HandleFormBtn from "../../../../components/HandleFormBtn";

const SecondStep = () => {
  const { moveNextPage, setRegistrationDetails, registrationDetails } =
    useContext(RegisterContext);

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: registrationDetails.name,
      email: registrationDetails.email,
    },
    validationSchema: personalInfoValidationSchema,
    onSubmit: async (values) => {
      setRegistrationDetails({
        ...registrationDetails,
        name: values.name,
        email: values.email,
      });
      moveNextPage();
    },
  });
  return (
    <form>
      <div className="input__container ">
        <div className="input__header">
          <h3>your name</h3>
        </div>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={errors.name && touched.name ? "border__red" : ""}
        />
        <InLineInputError touched={touched.name} errors={errors.name} />
      </div>
      <div className="input__container input__bottom ">
        <div className="input__header">
          <h3>your email</h3>
        </div>
        <input
          type="email"
          name="email"
          placeholder="e.g johndoe@gmail.com"
          value={values.email}
          onChange={handleChange}
          className={errors.email && touched.email ? "border__red" : ""}
        />
        <InLineInputError touched={touched.email} errors={errors.email} />
      </div>
      <HandleFormBtn handleForm={handleSubmit} content="continue" />
    </form>
  );
};

export default SecondStep;
