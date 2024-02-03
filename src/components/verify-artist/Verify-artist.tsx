import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { Container, PersonalDataContainer, Card, Header, BirthdayButton, Input, BirthdayContainer, LinkButton, CountryButton, CountryContainer, P, CountryContent, FooterContent } from './Verify-artist.styled';
import { useFormik } from "formik";
import { verifyArtistSchema } from "../../validation/yup.config";
import { verifyArtist } from "../../stores/toVerify-artist.mobx";
import { modalStore } from "../../stores/toModal.mobx";
import { regions } from "../../constants/regions";
import { user } from "../../stores/toUser.mobx";
import { Title } from "../../helmet";

export const VerifyArtist = observer(() => {
  const[currentCountry, setCurrentCountry] = useState<string>('');
  const[isOpen, setIsOpen] = useState<boolean>(false);
  const[gender, setGender] = useState<'male' | 'female'>('male');
  const date = verifyArtist.personalData.birthDate.split('.');
  
  const formik = useFormik<{
    name: string;
    surname: string;
    passportNumber: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
  }>({
    initialValues: {
      name: '',
      surname: '',
      passportNumber: '',
      birthDay: date[0],
      birthMonth: date[1],
      birthYear: date[2]
    },
    onSubmit: () => {},
    validationSchema: verifyArtistSchema
  });

  useEffect(() => {
    verifyArtist.setPersonalData('sex', gender.toUpperCase());
  }, [gender]);
  
  useEffect(() => {
    const _ = formik.values;
    if(parseInt(_.birthMonth) < 10) {
      verifyArtist.setPersonalData('birth date', `${_.birthDay}.0${_.birthMonth.replace('0', '')}.${_.birthYear}`);
    }
  }, [formik.values]);

  useEffect(() => {
    if(formik.values.name) {
      verifyArtist.setPersonalData('name', formik.values.name);
    }

    if(formik.values.surname) {
      verifyArtist.setPersonalData('surname', formik.values.surname);
    }
  }, [formik.values.name, formik.values.surname]);

  return (
    <>
      <Title title='Verify artist' />
      <Container>
        <Header>Verify artist</Header>
        <PersonalDataContainer>
          <Card>
            <P>enter your data</P>
            <Input
              $isError={!!formik.errors.name}
              onChange={(e: any) => {
                formik.handleChange(e);
                verifyArtist.setPersonalData('name', e.target.value);
              }}
              onBlur={formik.handleBlur}
              placeholder="name"
              $width="146px"
              name="name"
            />
            <Input
              $isError={!!formik.errors.surname}
              onChange={(e: any) => {
                formik.handleChange(e);
                verifyArtist.setPersonalData('surname', e.target.value);
              }}
              onBlur={formik.handleBlur}
              placeholder="surname"
              $width="146px"
              name="surname"
            />
            <Input
              $isError={!!formik.errors.passportNumber}
              onChange={(e: any) => {
                formik.handleChange(e);
                verifyArtist.setPersonalData('passport number', e.target.value);
              }}
              placeholder="passport number"
              onBlur={formik.handleBlur}
              $width="146px"
              name="passportNumber"
            />
          </Card>
          <Card>
            <P>select your birth date</P>
            <BirthdayContainer>
              <Input
                defaultValue={formik.values.birthDay}
                $isError={!!formik.errors.birthDay}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="day"
                name="birthDay"
              />
              <Input
                defaultValue={formik.values.birthMonth}
                $isError={!!formik.errors.birthMonth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="month"
                name="birthMonth"
              />
              <Input
                defaultValue={formik.values.birthYear}
                $isError={!!formik.errors.birthYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="year"
                name="birthYear"
              />
            </BirthdayContainer>
            <FooterContent>
              <CountryButton
                onClick={() => setGender(gender === 'male' ? 'female' : 'male')}
              >{gender}</CountryButton>
              <LinkButton
                onClick={() => modalStore.setLinks(true)}
              >Add links</LinkButton>
              <CountryContent>
                <P>select country</P>
                <CountryButton
                  onClick={() => setIsOpen(!isOpen)}
                >{currentCountry ? currentCountry : user.region}</CountryButton>
                <CountryContainer $isOpen={isOpen}>
                  {regions.map((country, index) => (
                    <CountryButton key={index} onClick={() => {
                      setCurrentCountry(country);
                      verifyArtist.setPersonalData('country', country.replace(/[^\x00-\x7F]/g, '').trim());
                      setIsOpen(false);
                    }}>{country}</CountryButton>
                  ))}
                </CountryContainer>
              </CountryContent>
            </FooterContent>
          </Card>
        </PersonalDataContainer>
        <BirthdayButton
          style={{ alignSelf: 'center' }} 
          onClick={() => verifyArtist.verifyArtist()}
        >Confirm</BirthdayButton>
      </Container>
    </>
  );
});