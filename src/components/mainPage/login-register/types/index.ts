export interface IRegisterDTO {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export interface ILoginDTO {
  login: string,
  password: string
}