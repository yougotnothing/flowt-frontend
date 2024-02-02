import { FC, useEffect } from "react";

import {
  LikedSongs,
  SongIcon,
  Wrapper,
  Song,
  SongInfoContainer,
  SongInfo,
  RecommendationsWrapper,
  Recommendation,
  RecommendationIcon,
  RecommendationTitleContainer,
  Text,
  RecommendationCard,
  Title,
  Container,
  Span
} from "./Home.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { recommendations } from "../../../stores/toRecommendations.mobx";
import { savedPlaylists } from "../../../stores/toSaved-playlists.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as PageTitle } from "../../../helmet";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { generatePath, useNavigate } from "react-router-dom";
import { Navigation } from 'swiper/modules';

export const Home: FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    recommendations.getRecommendationList();
    recommendations.getMustLikeList();
    user.getLastListened('songs');
    user.getLastListened('playlists');
    savedPlaylists.getSaved();
    likedSongs.setSongs();
    savedPlaylists.getSaved();
  }, []);

  return (
    <Wrapper>
      <PageTitle title="Home" />
      <Container>
      <Title>Last listened</Title>
      <LikedSongs>
        {likedSongs.songs.length ? likedSongs.songs.map((song, index) => (
          <Song key={index}>
            <SongIcon
              $author={song.author}
              $name={song.name}
              />
            <SongInfoContainer>
              <SongInfo 
                $type="name"
                onClick={() => navigate(generatePath('/song/:id', { id: song.name }))}
                >{song.name}</SongInfo>
              <SongInfo $type="author">{song.author}</SongInfo>
            </SongInfoContainer>
          </Song>
        )) : (
          <Span>This will be your last listened songs</Span>
        )}
      </LikedSongs>
      </Container>
      <RecommendationsWrapper>
        <Title>Recommendations</Title>
        <Recommendation>
          <Swiper
            spaceBetween={2}
            slidesPerView={3}
            navigation
            modules={[Navigation]}
            className="mySwiper"
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
      </RecommendationsWrapper>
      <Container>
        <Title>Playlists</Title>
        <LikedSongs>
          {savedPlaylists.playlists.length ? savedPlaylists.playlists.map((playlist, index) => (
            <Song key={index}>
              <SongIcon
                $author={playlist.author}
                $name={playlist.name}
                $playlist
              />
              <SongInfoContainer>
                <SongInfo 
                  $type="name"
                  onClick={() => navigate(generatePath('/song/:id', { id: playlist.name }))}
                >{playlist.name}</SongInfo>
                <SongInfo $type="author">{playlist.author}</SongInfo>
              </SongInfoContainer>
            </Song>
          )) : (
            <Span>This will be your liked playlists</Span>
          )}
        </LikedSongs>
      </Container>
    </Wrapper>
  );
});