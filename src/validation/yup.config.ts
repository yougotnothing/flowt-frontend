import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  username: Yup.string().min(4, "Username is too short").max(15, "Username is too long").required("Enter username"),
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], `passwords don't match`)
});

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().min(4, "Username is too short").max(15, "Username is too long").required("Enter username"),
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password")
});

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], `Passwords don't match`)
});

export const songNameSchema = Yup.object().shape({
  songName: Yup.string().min(1, "Song name too short").max(25, "Song name too long").required("Enter song name")
});

export const restorePasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Enter password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], `passwords don't match`),
  code: Yup.string().min(4, "Code invalid").max(4, "Code invalid").required("Enter code")
});

export const putEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email")
});

export const changeUsernameSchema = Yup.object().shape({
  username: Yup.string().min(4, "Username is too short").max(15, "Username is too long").required("Enter username")
});

export const changeDescriptionSchema = Yup.object().shape({
  description: Yup.string().max(120, "discription too long")
});

export const changeEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email")
});