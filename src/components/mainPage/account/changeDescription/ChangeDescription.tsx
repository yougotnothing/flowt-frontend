import React, { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useFormik } from 'formik';
import { AccountSettings } from '../AccountSettings';
import { changeDescriptionSchema } from '../../../../validation/yup.config';
import { api } from '../../../../api/axiosConfig';
import { Loader } from '../../../loader/Loader';
import { A, AContainer, GoBackContainer } from '../../MainPage.styled';
import { AccountContainer } from '../Account.styled';
import { userDescriptionStore } from "../../../../stores/toChangeDescription.mobx";
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
import { URLS } from "../../../../constants/urls.const";
import { user } from '../../../../stores/toUser.mobx';

export const ChangeDescription: React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = new URLS();
  
  const formik = useFormik<{
    description: string
  }>({
    initialValues: {
      description: ""
    },
    validationSchema: changeDescriptionSchema,
    onSubmit: () => {}
  });

  const patchDescription = async () => {
    try {
      userDescriptionStore.setDescription(formik.values.description);

      await api.patch(url.description, {
        newDescription: userDescriptionStore.description
      });

      setIsLoading(true);

      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      console.log('an error occurred:', error.response.data);
    }
  }

  const handlePatchDescription = async (key: any) => {
    if(key.key === 'Enter') {
      await patchDescription();
    }
  }

  const descriptionError = formik.errors.description && formik.touched.description && (
    <Error>{formik.errors.description}</Error>
  );

  useEffect(() => {
    if(user.isUserAuthenticated) {
      formik.setValues({ description: userDescriptionStore.description || "" });
    }
  }, [user.isUserAuthenticated]);

  return (
    <AccountContainer>
      {!user.isUserAuthenticated && <PageLoader />}
      {user.isUserAuthenticated && <AccountSettings />}
      <Container>
        {user.isUserAuthenticated && (
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
                formik.setFieldValue('description', e.target.value);
              }}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.description}
              onKeyDown={handlePatchDescription}
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