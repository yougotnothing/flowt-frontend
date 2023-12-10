import React from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { userRegionStore } from "../../../../stores/toChangeRegion.mobx"
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
import { regions } from "../../../../constants/regions";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { AccountSettings } from "../AccountSettings";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { URLS } from "../../../../constants/urls.const";
import { user } from "../../../../stores/toUser.mobx";

export const ChangeRegion: React.FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();

  const handleChangedRegion = async () => {
    try {
      const response = await api.patch(url.region, {
        newRegion: userRegionStore.region
      });

      if(response) {
        navigate(generatePath('/account/:id', {id: user.username}));
      }
    }catch(error: any) {
      console.error("an error occurred");
    }
  };

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
          <ChangeRegionContainer>
            <Container>
              <Title>Change region</Title>
              {userRegionStore && <ChosenRegion>{user.region}</ChosenRegion>}
              <Droplist>
                {regions.map((region, index) => (
                  <DroplistItem
                    key={index}
                    onClick={() => userRegionStore.setRegion(region)}
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