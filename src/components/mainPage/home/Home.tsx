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
import { userAvatarStore } from "../../../stores/toChangeAvatar";
import { observer } from "mobx-react-lite";
import { useUserContext } from "../../../contexts/UserContext";
import { api, API_URL } from "../../../api/axiosConfig";
import { subscribesStore } from "../../../stores/toSubscribes";
import { IUserProps } from "../../../types/props";

export const Home: React.FC = observer(() => {
  const { user, subscribes } = useUserContext();

  return (
    <>
      {user && (
       <>
       {!user && <PageLoader />}
        <FavoriteContainer>
          <Title>Favorite</Title>
          <UserContainer>
            {subscribes && subscribes.map((subscribe: IUserProps, index: number) => (
              <Card key={index}>
                {subscribe.userHaveAvatar ?
                  <CardIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/user/avatar/${subscribe.username}`)})`}}/>
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
});
