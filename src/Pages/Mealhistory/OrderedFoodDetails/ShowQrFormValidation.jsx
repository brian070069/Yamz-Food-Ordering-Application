import * as yup from "yup";

export const passwordValidationSchema = yup.object().shape({
  password: yup.string().required("required"),
});
