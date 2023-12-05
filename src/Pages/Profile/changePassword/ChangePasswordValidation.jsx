import * as yup from "yup";

export const ChangepasswordValidation = yup.object().shape({
  oldPassword: yup.string().required("required"),
  newPassword: yup.string().min(6, "minmum 6 characters").required("required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "passwords don't match")
    .required("required"),
});
