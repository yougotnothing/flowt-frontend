import { UserContainer, FavoriteContainer, Card, CardHeader, CardIcon, RecommendationsContainer, Title, Recommendations, RecommendationCard, RecommendationTitle, RecommendationsHeader, RecommendationsIcon, RecTextContainer } from "./home.styled";

export const Home = () => {

    return (
      <>
      <FavoriteContainer>
        <Title>Favorite</Title>
        <UserContainer>
          <Card>
            <CardIcon />
            <CardHeader>kozelNaLapax</CardHeader>
          </Card>
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
      </>
    );
}