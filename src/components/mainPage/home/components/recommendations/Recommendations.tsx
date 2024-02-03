import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recommendation, RecommendationCard, RecommendationIcon, RecommendationTitleContainer, RecommendationsWrapper, Title, Text, Span } from "../../Home.styled";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { recommendations } from "../../../../../stores/toRecommendations.mobx";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Recommendations = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    recommendations.getRecommendationList();
    recommendations.getMustLikeList();
  }, []);

  return (
    <RecommendationsWrapper>
      <Title>Recommendations</Title>
      <Recommendation>
        <Swiper
          spaceBetween={2}
          slidesPerView={3}
          navigation
          modules={[Navigation]}
        >
          {recommendations.list.length ? recommendations.list.map((recommendation, index) => (
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
            <Span>This will be your recommendations</Span>
          )}
        </Swiper>
      </Recommendation>
      <Title>Must like</Title>
      <Recommendation>
        <Swiper
          spaceBetween={2}
          slidesPerView={3}
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