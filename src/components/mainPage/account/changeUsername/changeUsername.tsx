import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { useNavigate, generatePath } from "react-router-dom";
import { changeUsernameSchema } from "../../../../validation/yup.config";
import { api, getUser } from "../../../../api/axiosConfig";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../mainPage.styled";
import { Container, Button, Input, Header, ChangeUsernameContainer } from "./changeUsername.styled";
import { Loader } from "../../../loader/loader";

export const ChangeUsername: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[isLoading, setIsLoading] = useState<boolean>(false);
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
      const response = await api.patch('/users/username', { newUsername: formik.values.username });
      setIsLoading(true);
      navigate('/home');
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
  }, []);
  
  return (
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
              <Header>Change username</Header>
              <Input
                placeholder={user.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="username"
                />
              <Button onClick={() => handleChangedUsername()}>{isLoading ? <Loader /> : 'Apply'}</Button>
            </Container>
          </ChangeUsernameContainer>
        )}
    </GlobalContainer>
  );
}