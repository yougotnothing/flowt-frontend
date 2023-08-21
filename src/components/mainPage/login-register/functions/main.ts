import { registration } from "../../../../api/axiosConfig";
import { nullState, booleanState } from "../../../../types/main";

export const tryCatchHelper = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  setErrorMessage: nullState,
  setUsernameError: booleanState,
  setEmailError: booleanState,
  setPasswordError: booleanState) => {

  const registerDto: any = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }
  try {
    await registration(registerDto);
    setErrorMessage(null);
  } catch (error: any) {
    const field = error.response.data.field;

    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage(error.response.data.message);
    switch(field) {
      case "username":
        setUsernameError(true);
        break;
      case "email":
        setEmailError(true);
        break;
      case "password":
        setPasswordError(true);
        break;
    }
  }
}
