import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username is too short").max(30, "Username is too long").required("Enter username"),
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string().min(4, "Password is too short").max(30, "Password is too long").required("Enter password")
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().min(3, "Email is too short").max(30, "Email is too long"),
  username: Yup.string().min(3, "Username is too short").max(30, "Username is too long"),
  password: Yup.string().min(4, "Password is too short").max(30, "Password is too long").required("Enter password")
});