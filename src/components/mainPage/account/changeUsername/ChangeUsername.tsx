import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useFormik } from "formik";
import { changeUsernameSchema } from "../../../../validation/yup.config";
import { api, getUser } from "../../../../api/axiosConfig";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { Span } from "../../login-register/Login.register.styled";
import { Container, Button, Input, Header, ChangeUsernameContainer } from "./ChangeUsername.styled";
import { Loader } from "../../../loader/Loader";
import { AccountContainer } from "../Account.styled";

import { Account } from "../Account";
import {PageLoader} from "../../../loader/pageLoader/PageLoader";

export const ChangeUsername: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[newUsername, setNewUsername] = useState<any>('');
  const navigate = useNavigate();

  const formik = useFormik<{
    username: ""
  }>({
    initialValues: {
      username: ""
    },
    validationSchema: changeUsernameSchema,
    onSubmit: () => {}
  });

  const handleChangedUsername = async () => {
    try {
      const response = await api.patch('/users/username', { newUsername: newUsername });
      setIsLoading(true);
      navigate(generatePath('/account/:id', { id: user.username }));
      if (response) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
      }
      window.location.reload();
    }catch(error: any) {
      setIsLoading(false);
      console.log('an error occured');
    }
  }
  
  useEffect(() => {
    getUser(setUser);

    if(user) {
      formik.setValues({
        username: user.username || ""
      })
    }
  }, [user]);
  
  return (
    <AccountContainer>
      {!user && <PageLoader />}
      {user && <Account />}
      <GlobalContainer>
        {user && (
          <GoBackContainer>
            <AContainer>
              <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
                Go back
              </A>
            </AContainer>
          </GoBackContainer>
          )}
          {user && (
            <ChangeUsernameContainer>
              <Container>
                <Header>Change <Span>username</Span></Header>
                <Input
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={(e: any) => {
                    setNewUsername(e.target.value);
                    formik.setFieldValue('username', e.target.value);
                  }}
                  defaultValue={formik.values.username}
                  />
                <Button onClick={() => handleChangedUsername()}>{isLoading ? <Loader /> : 'Apply'}</Button>
              </Container>
            </ChangeUsernameContainer>
          )}
      </GlobalContainer>
    </AccountContainer>
  );
}