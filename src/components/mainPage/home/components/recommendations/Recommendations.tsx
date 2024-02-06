import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Recommendation, RecommendationCard, RecommendationIcon, RecommendationTitleContainer, RecommendationsWrapper, Title, Text, Span } from "../../Home.styled";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { recommendations } from "../../../../../stores/toRecommendations.mobx";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { searchStore } from "../../../../../stores/toSearch.mobx";

export const Recommendations = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    recommendations.getRecommendationList();
    // recommendations.getMustLikeList();
  }, []);

  return (
    <RecommendationsWrapper>
      <Title>Recommendations</Title>
      <Recommendation>
        {recommendations.list.length ? (
          <Swiper
            spaceBetween={2}
            slidesPerView={3}
            navigation
            direction="horizontal"
            modules={[Navigation]}
          >
            {recommendations.list.length > 3 ? recommendations.list.map((recommendation, index) => (
              <SwiperSlide key={index}>
                <RecommendationCard
                  onClick={() => {
                    searchStore.setSong(recommendation);
                    navigate(generatePath('/song/:id', { id: recommendation.name }));
                  }}
                >
                  <RecommendationIcon
                    $author={recommendation.author}
                    $name={recommendation.name}
                  />
                  <RecommendationTitleContainer>
                    <Text $type="name">{recommendation.name}</Text>
                    <Text $type="author">{recommendation.author}</Text>
                  </RecommendationTitleContainer>
                </RecommendationCard>
              </SwiperSlide>
            )) : (
              <div style={{display: 'flex', flexDirection: 'row', gap: 40}}>
                {recommendations.list.map((recommendation, index) => (
                  <RecommendationCard key={index}
                    onClick={() => {
                      searchStore.setSong(recommendation);
                      navigate(generatePath('/song/:id', { id: recommendation.name }));
                    }}
                  >
                    <RecommendationIcon
                      $author={recommendation.author}
                      $name={recommendation.name}
                    />
                    <RecommendationTitleContainer>
                      <Text $type="name">{recommendation.name}</Text>
                      <Text $type="author">{recommendation.author}</Text>
                    </RecommendationTitleContainer>
                  </RecommendationCard>
                ))}
              </div>
            )}
          </Swiper>
        ) : (
          <Span>This will be your recommendations</Span>
        )}
      </Recommendation>
      <Title>Must like</Title>
      <Recommendation>
        <Swiper
          spaceBetween={2}
          slidesPerView={3}
          direction="horizontal"
          navigation
          modules={[Navigation]}
        >
          {recommendations.mustLikeList.length ? recommendations.mustLikeList.map((recommendation, index) => (
            <SwiperSlide key={index}>
              <RecommendationCard>
                <RecommendationIcon 
                  $author={recommendation.author}
                  $name={recommendation.name}
                />
                <RecommendationTitleContainer>
                  <Text $type="name">{recommendation.name}</Text>
                  <Text $type="author">{recommendation.author}</Text>
                </RecommendationTitleContainer>
              </RecommendationCard>
            </SwiperSlide>
          )) : (
            <Span>This will be your must like songs</Span>
          )}
        </Swiper>
      </Recommendation>
    </RecommendationsWrapper>
  );
});