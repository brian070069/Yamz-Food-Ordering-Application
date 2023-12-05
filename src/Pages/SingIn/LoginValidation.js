import * as yup from "yup";
import { phoneNumberRegex } from "./PhoneNumberregex";

export const LoginValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(phoneNumberRegex, "invalid phone number")
    .required("required"),
  password: yup.string().required("required"),
});
