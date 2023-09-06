import { useEffect, useState } from "react"

import { useNavigate, generatePath } from "react-router-dom";
import { getUser, api } from "../../../../api/axiosConfig";
import { changeEmailSchema } from "../../../../validation/yup.config";
import { useFormik } from "formik";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../mainPage.styled";
import { ChangeEmailContainer, Input, Button, Header, ContentContainer, Error } from "./changeEmail.styled";
import { Span } from "../../login-register/login.register.styled";
import { Loader } from "../../../loader/loader";
import { Account } from "../account";
import { AccountContainer } from "../account.styled";

export const ChangeEmail: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const formik = useFormik<{
    email: ""
  }>({
    initialValues: {
      email: ""
    },
    validationSchema: changeEmailSchema,
    onSubmit: () => {}
  });

  const handleChangeEmail = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch('/users/email', { newEmail: formik.values.email });
      navigate(generatePath('/account/:id', { id: user.username }));
      if(response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
      }
    }catch(error: any) {
      console.log('an error occured');
    }
  }

  useEffect(() => {
    getUser(setUser);
  }, []);

  const EmailError = formik.errors.email && formik.touched.email && <Error>{formik.errors.email}</Error>

  return (
    <AccountContainer>
      {user && <Account />}
      <GlobalContainer>
        {user && (
          <>
            <GoBackContainer>
              <AContainer>
                <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
                  Go back
                </A>
              </AContainer>
            </GoBackContainer>
            <ChangeEmailContainer>
              <ContentContainer>
                <Header>Change <Span>email</Span></Header>
                <Input 
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={user.email}
                />
                {EmailError}
                <Button onClick={() => handleChangeEmail()}>
                  {isLoading ? <Loader /> : "Submit"}
                </Button>
              </ContentContainer>
            </ChangeEmailContainer>
          </>
        )}
      </GlobalContainer>
    </AccountContainer>
  )
}