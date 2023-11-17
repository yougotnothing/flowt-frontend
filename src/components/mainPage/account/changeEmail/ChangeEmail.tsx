import React, { useEffect, useState } from "react"

import { useNavigate, generatePath } from "react-router-dom";
import { api } from "../../../../api/axiosConfig";
import { changeEmailSchema } from "../../../../validation/yup.config";
import { useFormik } from "formik";
import {
  A,
  AContainer,
  GoBackContainer,
  GlobalContainer
} from "../../MainPage.styled";
import {
  ChangeEmailContainer,
  Input,
  Button,
  Header,
  ContentContainer,
  Error
} from "./ChangeEmail.styled";
import { Span } from "../../login-register/Login.register.styled";
import { Loader } from "../../../loader/Loader";
import { AccountSettings } from "../AccountSettings";
import { AccountContainer } from "../Account.styled";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../../contexts/UserContext";
import { userEmailStore } from "../../../../stores/toChangeEmail.mobx";
import { observer } from "mobx-react-lite";
import { URLS } from "../../../../constants/urls.const";

export const ChangeEmail: React.FC = observer(() => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[backendError, setBackendError] = useState<string | null>(null);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const url = new URLS();

  const formik = useFormik<{
    email: string
  }>({
    initialValues: {
      email: ""
    },
    validationSchema: changeEmailSchema,
    onSubmit: () => {}
  });

  useEffect(() => {
    formik.setValues({
      email: userEmailStore.email || ""
    });
  }, [user]);

  const handleChangeEmail = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(url.email, {
        newEmail: formik.values.email
      });

      if(response) {
        navigate(generatePath('/account/:id', { id: user.username }));
      }
    }catch(error: any) {
      setIsLoading(false);
      setBackendError(error.response.data.message);
      console.log(backendError);
    }
  }

  const EmailError = formik.errors.email && formik.touched.email && <Error>{formik.errors.email}</Error>

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      {user && (
        <GlobalContainer>
          <AccountSettings />
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
                onChange={(e: any) => {
                  formik.setFieldValue('email', e.target.value);
                  userEmailStore.setEmail(e.target.value);
                }}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.email}
              />
                {EmailError}
                {backendError && <Error>{backendError}</Error>}
              <Button onClick={() => handleChangeEmail()} disabled={isLoading}>
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            </ContentContainer>
          </ChangeEmailContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  )
});