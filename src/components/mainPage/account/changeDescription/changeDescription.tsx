import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useFormik } from 'formik';
import { Account } from '../account';
import { changeDescriptionSchema } from '../../../../validation/yup.config';
import { api, getUser } from '../../../../api/axiosConfig';
import { Loader } from '../../../loader/loader';
import { A, AContainer, GoBackContainer } from '../../mainPage.styled';
import { AccountContainer } from '../account.styled';
import { 
  ChangeDescriptionContainer, 
  Input, 
  Button, 
  Title,
  Error, 
  Container 
} from './changeDescription.styled';
import { Span } from '../../login-register/login.register.styled';

export const ChangeDescription: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[user, setUser] = useState<any>(null);
  const[newDescription, setNewDescription] = useState<any>('');
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
  

  const patchDescription = async () => {
    try {
      const response = await api.patch('/users/description', { newDescription: newDescription });
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

  useEffect(() => {
    getUser(setUser);
    
    if(user){
      formik.setValues({
        description: user.description || ""
      });
    }
  }, [user]);

  return (
    <AccountContainer>
      {user && <Account />}
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
            <Title>Change <Span>description</Span></Title>
            <Input
              name='description'
              onChange={(e: any) => {
                setNewDescription(e.target.value);
                formik.setFieldValue('description', e.target.value);
              }}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.description}
            />
            {descriptionError}
            <Button onClick={() => patchDescription()}>
              {isLoading ? <Loader /> : 'Set description'}
            </Button>
          </ChangeDescriptionContainer>
        )}
      </Container>
    </AccountContainer>
  );
}