import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
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
import { Loader } from "../../../loader/Loader";
import { user } from "../../../../stores/toUser.mobx";
import { AccountSettings } from "../AccountSettings";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";

export const ChangeUsername: React.FC = observer(() => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleChangedUsernameEnter = async (e: any) => {
    try {
      if(e.target.value !== user.username && (e.key === 'Enter' || e.code === 'Enter')) {
        await user.changeUsername(formik.values.username, navigate, setIsLoading);
        await user.setUser();
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  const handleChangedUsername = async () => {
    try {
      if(formik.values.username !== user.username) {
        await user.changeUsername(formik.values.username, navigate, setIsLoading);
        await user.setUser();
      }
    }catch(error: any) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if(user.isUserAuthenticated) {
      formik.setValues({ username: user.username || "" });
    }
  }, [user.isUserAuthenticated]);
  
  return (
    <AccountContainer>
      {!user.isUserAuthenticated && <PageLoader />}
      {user.isUserAuthenticated && (
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
                onKeyDown={e => handleChangedUsernameEnter(e)}
                name="username"
                onBlur={formik.handleBlur}
                onChange={e => formik.setFieldValue('username', e.target.value)}
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