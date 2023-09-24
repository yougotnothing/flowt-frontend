import React, { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useFormik } from 'formik';
import { Account } from '../Account';
import { changeDescriptionSchema } from '../../../../validation/yup.config';
import { api } from '../../../../api/axiosConfig';
import { Loader } from '../../../loader/Loader';
import { A, AContainer, GoBackContainer } from '../../MainPage.styled';
import { AccountContainer } from '../Account.styled';
import { 
  ChangeDescriptionContainer, 
  Input, 
  Button, 
  Title,
  Error, 
  Container 
} from './ChangeDescription.styled';
import { Span } from '../../login-register/Login.register.styled';
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useContextValues } from "../../../../contexts/Context";

export const ChangeDescription: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[newDescription, setNewDescription] = useState<string | null>(null);
  const { user } = useContextValues();
  const navigate = useNavigate();
  
  const formik = useFormik<{
    description: ""
  }>({
    initialValues: {
      description: ""
    },
    validationSchema: changeDescriptionSchema,
    onSubmit: () => {}
  });

  const patchDescription = async () => {
    try {
      await api.patch('/users/description', { newDescription: newDescription });
      setIsLoading(true);
      navigate(generatePath('/account/:id', { id: user.username }));
      window.location.reload();
    }catch(error: any) {
      console.log('an error occured');
    }
  }

  const descriptionError = formik.errors.description && formik.touched.description && (
    <Error>{formik.errors.description}</Error>
  );

  useEffect(() => {
    if(user){
      formik.setValues({
        description: user.description || ""
      });
    }
  }, [user]);

  return (
    <AccountContainer>
      {!user && <PageLoader />}
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
            <Button onClick={patchDescription}>
              {isLoading ? <Loader /> : 'Set description'}
            </Button>
          </ChangeDescriptionContainer>
        )}
      </Container>
    </AccountContainer>
  );
}