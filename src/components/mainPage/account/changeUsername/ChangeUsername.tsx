import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useContextValues } from "../../../../contexts/Context";
import { useFormik } from "formik";
import { changeUsernameSchema } from "../../../../validation/yup.config";
import { AccountContainer } from "../Account.styled";
import {
  A,
  AContainer,
  GoBackContainer,
  GlobalContainer
} from "../../MainPage.styled";
import {
  Container,
  Button,
  Input,
  Header,
  ChangeUsernameContainer
} from "./ChangeUsername.styled";
import { api } from "../../../../api/axiosConfig";
import { Loader } from "../../../loader/Loader";

import { Account } from "../Account";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";

export const ChangeUsername: React.FC = observer(() => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, userUsernameStore } = useContextValues();

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
      const response = await api.patch('/users/username', {
        newUsername: userUsernameStore.Username
      });
      setIsLoading(true);
      navigate(generatePath('/account/:id', { id: user.username }));
      if (response) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
      }
    }catch(error: any) {
      setIsLoading(false);
      console.log('an error occurred');
    }
  }
  
  useEffect(() => {
    if(user) formik.setValues({ username: userUsernameStore.Username || "" });
  }, [user]);
  
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
          <ChangeUsernameContainer>
            <Container>
              <Header>Change username</Header>
              <Input
                name="username"
                onBlur={formik.handleBlur}
                onChange={(e: any) => {
                  userUsernameStore.setUsername(e.target.value);
                  formik.setFieldValue('username', e.target.value);
                }}
                defaultValue={formik.values.username}
                />
              <Button onClick={() => handleChangedUsername()}>{isLoading ? <Loader /> : 'Apply'}</Button>
            </Container>
          </ChangeUsernameContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  );
});