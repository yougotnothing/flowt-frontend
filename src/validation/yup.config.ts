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
  email: Yup.string().email("Invalid email").required("Enter email")
});

export const searchSchema = Yup.object().shape({
  search: Yup.string().max(45, "input too long")
});

export const playlistSchema = Yup.object().shape({
  name: Yup.string().max(20, "Name too long."),
  descirption: Yup.string().max(36, "Description too long")
});

export const verifyArtistSchema = Yup.object().shape({
  name: Yup.string().min(2, 'name too short').max(24, 'Name too long.'),
  surname: Yup.string().min(2, 'surname too short').max(24, 'Surname too long.'),
  passportNumber: Yup.string().min(8, 'Passport number too short').max(8, 'Passport number too long'),
  birthYear: Yup.number().min(1900, 'true').max(new Date().getUTCFullYear(), 'true').required('true'),
  birthMonth: Yup.number().max(12, 'true').min(1, 'true').required('true'),
  birthDay: Yup.number().min(1, 'true').max(31, 'true').required('true')
});

export const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email")
});
