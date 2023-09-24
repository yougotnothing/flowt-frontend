import React, { useEffect, useState } from "react"

import { useNavigate, generatePath } from "react-router-dom";
import { api } from "../../../../api/axiosConfig";
import { changeEmailSchema } from "../../../../validation/yup.config";
import { useFormik } from "formik";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { ChangeEmailContainer, Input, Button, Header, ContentContainer, Error } from "./ChangeEmail.styled";
import { Span } from "../../login-register/Login.register.styled";
import { Loader } from "../../../loader/Loader";
import { Account } from "../Account";
import { AccountContainer } from "../Account.styled";
import {PageLoader} from "../../../loader/pageLoader/PageLoader";
import { useContextValues } from "../../../../contexts/Context";

export const ChangeEmail: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContextValues();
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

  useEffect(() => {
    if(user) {
      formik.setValues({
        email: user.email || ""
      });
    }
  }, []);

  const handleChangeEmail = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch('/users/email', { newEmail: formik.values.email });
      if(response) {
        navigate(generatePath('/account/:id', { id: user.username }));
        window.location.reload();
      }
    }catch(error: any) {
      console.log('an error occurred');
    }
  }

  const EmailError = formik.errors.email && formik.touched.email &&
      <Error>{formik.errors.email}</Error>

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      {user && (
        <GlobalContainer>
          <Account />
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
                defaultValue={formik.values.email}
              />
              {EmailError}
              <Button onClick={handleChangeEmail}>
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            </ContentContainer>
          </ChangeEmailContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  )
}