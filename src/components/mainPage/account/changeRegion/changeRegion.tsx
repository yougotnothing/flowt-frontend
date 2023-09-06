import { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import regionData from "../../../../consts/countries.json"
import { api, getUser } from "../../../../api/axiosConfig";
import { Span } from "../../login-register/login.register.styled";
import { AccountContainer } from "../account.styled";
import { 
  ChangeRegionContainer, 
  Button, 
  Title, 
  Container, 
  Droplist, 
  DroplistItem, 
  ChoosenRegion 
} from "./changeRegion.stlyed";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../mainPage.styled";
import { Account } from "../account";

export const ChangeRegion: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[choosenRegion, chooseRegion] = useState<any>(null);
  const navigate = useNavigate();
  let counter: number = 0;

  const handleChangedRegion = async () => {
    try {
      const response = await api.patch('/users/region', { newRegion: choosenRegion });
      if(response) {
        localStorage.setItem('token', response.data.token);
        navigate(generatePath('/account/:id', { id: user.username }));
      }
    }catch(error: any) {
      console.log("an error occured");
    }
  }
  
  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <AccountContainer>
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
                {choosenRegion && <ChoosenRegion>{choosenRegion}</ChoosenRegion>}
                <Droplist>
                  {regionData.map((region: any) => (
                    <DroplistItem
                      key={++counter}
                      onClick={() => chooseRegion(region)}
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