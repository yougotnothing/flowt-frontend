import React from "react";

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
import { userAvatarStore } from "../../../store/toChangeAvatar";

export const Home: React.FC = () => {
  const { user, subscribes } = useUserContext();
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
                <CardIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
                <CardHeader>{subscribe}</CardHeader>
              </Card>
            )) : null}
          </UserContainer>
        </FavoriteContainer>
          <Recommendations>
            <Title>Recommendations</Title>
          <RecommendationsContainer>
            <RecommendationCard>
              <RecommendationsIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
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
