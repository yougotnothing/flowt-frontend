import React from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { userRegionStore } from "../../../../store/toChangeRegion"
import regionData from "../../../../consts/countries.json"
import { api } from "../../../../api/axiosConfig";
import { AccountContainer } from "../Account.styled";
import { 
  ChangeRegionContainer, 
  Button, 
  Title, 
  Container, 
  Droplist, 
  DroplistItem, 
  ChosenRegion
} from "./ChangeRegion.styled";

import { A, AContainer,GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { Account } from "../Account";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useContextValues } from "../../../../contexts/Context";

export const ChangeRegion: React.FC = observer(() => {
  const { user } = useContextValues();
  const navigate = useNavigate();
  let counter: number = 0;

  const handleChangedRegion = async () => {
    try {
      const response = await api.patch('/users/region', {newRegion: userRegionStore.userRegion});
      if(response) {
        navigate(generatePath('/account/:id', {id: user.username}));
      }
    }catch(error: any) {
      console.error("an error occurred");
    }
  };

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
          <ChangeRegionContainer>
            <Container>
              <Title>Change region</Title>
              {userRegionStore && <ChosenRegion>{userRegionStore.userRegion}</ChosenRegion>}
              <Droplist>
                {regionData.map((region: string) => (
                  <DroplistItem
                    key={++counter}
                    onClick={() => userRegionStore.setUserRegion(region)}
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
});