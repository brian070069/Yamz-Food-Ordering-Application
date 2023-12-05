import * as yup from "yup";
import { phoneNumberRegex } from "../SingIn/PhoneNumberregex";

// phone number schema
export const phoneNumberValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("required")
    .matches(phoneNumberRegex, "invalid phone number"),
});

// name/email schema
export const personalInfoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "too short")
    .max(20, "too long")
    .required("required"),
  email: yup.string().email("Invalid email").required("required"),
});

// passwords schema
export const passwordValidationSchema = yup.object().shape({
  password: yup.string().min(6, "minmum 6 characters").required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords don't match")
    .required("required"),
});

//verificationcode schema
export const verificationcodeValidationSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .min(4, "should be a minimum of 4 digits")
    .max(4, "should be a max of 4 digits")
    .required("required"),
});
