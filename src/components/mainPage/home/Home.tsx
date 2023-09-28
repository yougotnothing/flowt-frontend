import React from "react";

import { API_URL } from "../../../api/axiosConfig";
import {
  UserContainer,
  FavoriteContainer,
  Card,
  CardHeader,
  CardIcon,
  RecommendationsContainer,
  Title,
  Recommendations,
  RecommendationCard,
  RecommendationTitle,
  RecommendationsHeader,
  RecommendationsIcon,
  RecTextContainer,
  LastListenCard,
  LastListenContainer
} from "./Home.styled";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../contexts/UserContext";
export const Home = () => {
  const { user, subscribes, followers } = useUserContext();
  let counter: number = 0;

  return (
    <>
      {user && (
       <>
       {!user && <PageLoader />}
        <FavoriteContainer>
          <Title>Favorite</Title>
          <UserContainer>
            {subscribes ? subscribes.map((subscribe: any) => (
              <Card key={++counter}>
                <CardIcon style={{
                  backgroundImage: `url(${API_URL}/images/user/${subscribe})`
                }} />
                <CardHeader>{subscribe}</CardHeader>
              </Card>
            )) : null}
          </UserContainer>
        </FavoriteContainer>
          <Recommendations>
            <Title>Recommendations</Title>
          <RecommendationsContainer>
            <RecommendationCard>
              <RecommendationsIcon style={{backgroundImage: `url(${API_URL}/images/user/${user.username})`}} />
              <RecTextContainer>
                <RecommendationTitle>{user.username}</RecommendationTitle>
                <RecommendationsHeader>{user.username}</RecommendationsHeader>
              </RecTextContainer>
            </RecommendationCard>
          </RecommendationsContainer>
          </Recommendations>
          <LastListenContainer>
            <LastListenCard>

            </LastListenCard>
          </LastListenContainer>
       </>
      )}
    </>
  );
}
