import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import regionData from "../../../../consts/countries.json"
import { api } from "../../../../api/axiosConfig";
import { Span } from "../../login-register/Login.register.styled";
import { AccountContainer } from "../Account.styled";
import { 
  ChangeRegionContainer, 
  Button, 
  Title, 
  Container, 
  Droplist, 
  DroplistItem, 
  ChoosenRegion 
} from "./ChangeRegion.styled";

import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { Account } from "../Account";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useContextValues } from "../../../../contexts/Context";

export const ChangeRegion: React.FC = () => {
  const[chosenRegion, choseRegion] = useState<any>(null);
  const { user } = useContextValues();
  const navigate = useNavigate();
  let counter: number = 0;

  const handleChangedRegion = async () => {
    try {
      const response = await api.patch('/users/region', { newRegion: chosenRegion });
      if(response) {
        localStorage.setItem('token', response.data.token);
        navigate(generatePath('/account/:id', { id: user.username }));
      }
    }catch(error: any) {
      console.log("an error occurred");
    }
  }

  return (
    <AccountContainer>
    {!user && <PageLoader />}
    {user && (
      <GlobalContainer> 
        <GoBackContainer>
          <AContainer>
            <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
              Go back
            </A>
          </AContainer>
        </GoBackContainer>
        <Account />
          <ChangeRegionContainer>
              <Container>
                <Title>Change <Span>region</Span></Title>
                {chosenRegion && <ChoosenRegion>{chosenRegion}</ChoosenRegion>}
                <Droplist>
                  {regionData.map((region: any) => (
                    <DroplistItem
                      key={++counter}
                      onClick={() => choseRegion(region)}
                    >
                      {region}
                    </DroplistItem>
                  ))}
                </Droplist>
                <Button onClick={() => handleChangedRegion()}>Apply</Button>
              </Container>
          </ChangeRegionContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  )
}