import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useFormik } from 'formik';
import { changeDescriptionSchema } from '../../../../validation/yup.config';
import { api, getUser } from '../../../../api/axiosConfig';
import { Loader } from '../../../loader/loader';
import { A, AContainer, GoBackContainer } from '../../mainPage.styled';
import { ChangeDescriptionContainer, Input, Button, Title, Error, Container } from './changeDescription.styled';

export const ChangeDescription: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const formik = useFormik<{
    description: ""
  }>({
    initialValues: {
      description: ""
    },
    validationSchema: changeDescriptionSchema,
    onSubmit: () => {}
  })

  useEffect(() => {
    getUser(setUser);
  }, []);

  const patchDescription = async () => {
    try {
      const response = await api.patch('/users/description', { newDescription: formik.values.description });
      setIsLoading(true);
      navigate(generatePath('/account/:id', { id: user.username }));
      if(response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
      }
    }catch(error: any) {
      console.log('an error occured');
    }
  }

  const descriptionError = formik.errors.description && formik.touched.description && (
    <Error>{formik.errors.description}</Error>
  );

  return (
    <Container>
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
        <ChangeDescriptionContainer>
          <Title>Change description</Title>
          <Input 
            placeholder={user.description}
            name='description'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            />
          {descriptionError}
          <Button onClick={() => patchDescription()}>
            {isLoading ? <Loader /> : 'Set description'}
          </Button>
        </ChangeDescriptionContainer>
      )}
    </Container>
  );
}