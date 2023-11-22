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
import { userAvatarStore } from "../../../stores/toChangeAvatar.mobx";
import { observer } from "mobx-react-lite";
import { useUserContext } from "../../../contexts/UserContext";
import { IUserProps } from "../../../types/props";

export const Home: React.FC = observer(() => {
  const { user, subscribes } = useUserContext();

  return (
    <>
      <FavoriteContainer>
        <Title>Favorite</Title>
        <UserContainer>
          {subscribes && subscribes.map((subscribe: IUserProps, index: number) => (
            <Card key={index}>
              {subscribe.userHaveAvatar ?
                <CardIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}}/>
                :
                <CardIcon style={{backgroundImage: 'url(/defaultAvatar.png)'}}/>
              }
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
              <RecommendationsIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
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
