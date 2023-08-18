import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  username: Yup.string().min(4, "Username is too short").max(15, "Username is too long").required("Enter username"),
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password")
});

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().min(4, "Username is too short").max(15, "Username is too long").required("Enter username"),
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password")
});