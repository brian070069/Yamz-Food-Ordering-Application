import * as yup from "yup";

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup.string().min(6, "minmum 6 characters").required("required"),
  verificationCode: yup
    .string()
    .min(4, "minimum of 4")
    .max(4, "maximum of 4")
    .required("required"),
});
