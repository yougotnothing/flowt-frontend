import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Recommendation, RecommendationCard, RecommendationIcon, RecommendationTitleContainer, RecommendationsWrapper, Title, Text, Span } from "../../Home.styled";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { recommendations } from "../../../../../stores/toRecommendations.mobx";
import { searchStore } from "../../../../../stores/toSearch.mobx";
import { userSongsStore } from "../../../../../stores/toSongs.mobx";
import { RandomSongButton } from "../../../../songs/browse-songs/Songs.styled";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { searchUsersStore } from "../../../../../stores/toSearchUsers.mobx";

export const Recommendations = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    recommendations.getRecommendationList();
  }, []);

  return (
    <RecommendationsWrapper>
      <Title>Recommendations</Title>
      <Span $size="22">Play random song! <RandomSongButton
        onClick={() => {
          userSongsStore.getRandomSong();
        }}
      /></Span>
      <Recommendation>
        {recommendations.list.length ? (
          <Swiper
            className="swiper-wrapper"
            spaceBetween={2}
            slidesPerView={3}
            direction="horizontal"
            navigation
            modules={[Navigation]}
          >
            {recommendations.list.length > 3 ? recommendations.list.map((recommendation, index) => (
              <SwiperSlide key={index}>
                <RecommendationCard>
                  <RecommendationIcon
                    onClick={() => userSongsStore.setSong(index, recommendations.list)}
                    $author={recommendation.author}
                    $name={recommendation.name}
                  />
                  <RecommendationTitleContainer>
                    <Text
                      $type="name"
                      onClick={() => {
                        searchStore.setSong(recommendation);
                        navigate(generatePath('/song/:id', { id: recommendation.name }));  
                      }}
                    >{recommendation.name}</Text>
                    <Text $type="author"
                      onClick={() => searchUsersStore.getPublicUser(recommendation.author, navigate)}
                    >{recommendation.author}</Text>
                  </RecommendationTitleContainer>
                </RecommendationCard>
              </SwiperSlide>
            )) : (
              <div style={{display: 'flex', flexDirection: 'row', gap: 40}}>
                {recommendations.list.map((recommendation, index) => (
                  <RecommendationCard key={index}>
                    <RecommendationIcon
                      onClick={() => userSongsStore.setSong(index, recommendations.list)}
                      $author={recommendation.author}
                      $name={recommendation.name}
                    />
                    <RecommendationTitleContainer>
                      <Text $type="name"
                        onClick={() => {
                          searchStore.setSong(recommendation);
                          navigate(generatePath('/song/:id', { id: recommendation.name }));
                        }}
                      >{recommendation.name}</Text>
                      <Text $type="author"
                        onClick={() => searchUsersStore.getPublicUser(recommendation.author, navigate)}
                      >{recommendation.author}</Text>
                    </RecommendationTitleContainer>
                  </RecommendationCard>
                ))}
              </div>
            )}
          </Swiper>
        ) : (
          <Span $size="16">This will be your recommendations</Span>
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
          {recommendations.mustLikeList.length > 3 ? recommendations.mustLikeList.map((recommendation, index) => (
            <SwiperSlide key={index}>
              <RecommendationCard>
                <RecommendationIcon
                  onClick={() => userSongsStore.setSong(index, recommendations.mustLikeList)}
                  $author={recommendation.author}
                  $name={recommendation.name}
                />
                <RecommendationTitleContainer>
                  <Text
                    $type="name"
                    onClick={() => {
                      searchStore.setSong(recommendation);
                      navigate(generatePath('/song/:id', { id: recommendation.name }));  
                    }}
                  >{recommendation.name}</Text>
                  <Text $type="author"
                    onClick={() => searchUsersStore.getPublicUser(recommendation.author, navigate)}
                  >{recommendation.author}</Text>
                </RecommendationTitleContainer>
              </RecommendationCard>
            </SwiperSlide>
          )) : (
            <Span $size="16">This will be your must like songs</Span>
          )}
        </Swiper>
      </Recommendation>
    </RecommendationsWrapper>
  );
});