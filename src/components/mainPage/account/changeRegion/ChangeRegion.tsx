import React, { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
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
import { user } from "../../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../../helmet";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";

export const ChangeRegion: React.FC = observer(() => {
  const [chosenRegion, setChosenRegion] = useState<string | null>(user.region);
  const navigate = useNavigate();

  return (
    <AccountContainer>
    <Helmet title={`${user.username}: change region`} />
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
              {chosenRegion && <ChosenRegion>{chosenRegion}</ChosenRegion>}
              <Droplist>
                {regions.map((region, index) => (
                  <DroplistItem
                    key={index}
                    onClick={() => {
                      setChosenRegion(region);
                      searchUsersStore.setUser(user.user);
                    }}
                  >{region}</DroplistItem>
                ))}
              </Droplist>
              <Button onClick={() => user.changeRegion(chosenRegion, navigate)}>Apply</Button>
            </Container>
          </ChangeRegionContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  )
});