import * as yup from "yup";

export const addNewItemValidationSchema = yup.object().shape({
  food_name: yup
    .string()
    .min(3, "min 3 ")
    .max(20, "max 20")
    .required("required"),
  price: yup.number().typeError("must be a number").required("required"),
  description: yup.string().required("required"),
});
