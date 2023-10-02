import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useUserContext } from "../../../../contexts/UserContext";
import { userUsernameStore } from "../../../../store/toChangeUsername";
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

import { AccountSettings } from "../AccountSettings";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";

export const ChangeUsername: React.FC = observer(() => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik<{
    username: string
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
    if(user) {
      formik.setValues({ username: user.username || "" });
    }
  }, [user]);
  
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