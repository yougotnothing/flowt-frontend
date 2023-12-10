import { FC } from "react";

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
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";

export const Home: FC = observer(() => {
  return (
    <>
      <FavoriteContainer>
        <Title>Favorite</Title>
        <UserContainer>
          {user.subscribes.map((subscribe, index) => (
            <Card key={index}>
              <CardIcon $userHaveAvatar={subscribe.userHaveAvatar} $avatar={subscribe.avatar} />
              <CardHeader>{subscribe.username}</CardHeader>
            </Card>
          ))}
        </UserContainer>
      </FavoriteContainer>
      <Recommendations>
        <Title>Recommendations</Title>
      <RecommendationsContainer>
        <RecommendationCard>
          {user &&
            <>
              <RecommendationsIcon style={{backgroundImage: `url(${user.avatar})`}} />
              <RecTextContainer>
                <RecommendationTitle>{user.username}</RecommendationTitle>
                <RecommendationsHeader>{user.username}</RecommendationsHeader>
              </RecTextContainer>
            </>
          }
        </RecommendationCard>
      </RecommendationsContainer>
      </Recommendations>
      <LastListenContainer>
        <LastListenCard>

        </LastListenCard>
      </LastListenContainer>
    </>
  );
});