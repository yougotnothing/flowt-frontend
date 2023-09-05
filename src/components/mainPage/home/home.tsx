import { useState, useEffect } from "react";

import { getSubscribes, API_URL } from "../../../api/axiosConfig";
import { UserContainer, FavoriteContainer, Card, CardHeader, CardIcon, RecommendationsContainer,
  Title, Recommendations, RecommendationCard, RecommendationTitle, RecommendationsHeader, RecommendationsIcon,
  RecTextContainer, LastListenCard, LastListenContainer } from "./home.styled";

export const Home = () => {
  const[subscribes, setSubscribes] = useState<any>([]);
  let counter: number = 0;

  useEffect(() => { getSubscribes(setSubscribes) }, []);

  return (
    <>
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
          <RecommendationsIcon />
          <RecTextContainer>
            <RecommendationTitle>vilsonSex</RecommendationTitle>
            <RecommendationsHeader>test</RecommendationsHeader>
          </RecTextContainer>
        </RecommendationCard>
      </RecommendationsContainer>
      </Recommendations>
      <LastListenContainer>
        <LastListenCard>

        </LastListenCard>
      </LastListenContainer>
    </>
  );
}