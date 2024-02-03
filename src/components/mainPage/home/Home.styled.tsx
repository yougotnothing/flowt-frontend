import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { API_URL } from "../../../api/axiosConfig";

interface UrlProps {
  $name: string;
  $author: string;
  $playlist?: boolean;
}

interface TextProps {
  $type: 'name' | 'author';
}

export const Text = styled('a')<TextProps>`
  font-weight: 600;
  font-size: ${({ $type }) => $type === 'author' ? '18px' : '22px'};
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};
  outline: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.WHITE};
  }
`;

export const Title = styled('div')`
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  color: ${colors.WHITE};
`;

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  position: relative;
  align-items: start;
  margin: 0 auto;
`;

export const LikedSongs = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${colors.FRONT};
  border-radius: 12px;
  padding: 8px;
  max-width: 200px;
  max-height: 360px;
  overflow-y: auto;
`;

export const Song = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  gap: 12px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const SongIcon = styled('button')<UrlProps>`
  border-radius: 6px;
  width: 68px;
  height: 68px;
  border: none;
  background-image: url(${({ $author, $name, $playlist }) => ($playlist ? `${API_URL}/images/playlist/${$author}/${$name}` : `${API_URL}/images/song/${$author}/${$name}`)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 0.3s ease;
  padding: 0;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    background-image: url('/play_hover.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;
    transition: 0.3s ease;
    display: flex;
    border-radius: 6px;
    opacity: 0;
    cursor: pointer;
  }
  &:hover::after {
    opacity: 1;
  }
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  width: 124px;
  height: 100%;
  padding: 6px;
  background-color: ${colors.DARK_BLUE};
  border-radius: 6px;
`;

export const SongInfo = styled('a')<TextProps>`
  font-weight: 600;
  font-size: ${({ $type }) => $type === 'author' ? '16px' : '18px'};
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.WHITE};
  }
`;

export const RecommendationsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow-y: scroll;
  height: 720px;

  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 50%;
  }
  --swiper-navigation-color: ${colors.SECONDARY} !important;
`;

export const Recommendation = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: ${colors.FRONT};
  padding: 12px;
  border-radius: 14px;
  width: 620px;
`;

export const RecommendationCard = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: ${colors.VERY_DARK_BLUE};
  border-radius: 8px;
  padding: 8px;
  gap: 6px;
  cursor: pointer;
`;

export const RecommendationIcon = styled('picture')<UrlProps>`
  width: 164px;
  height: 164px;
  background-image: url(${({ $author, $name }) => `${API_URL}/images/song/${$author}/${$name}`});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
`;

export const RecommendationTitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
`;

export const Span = styled('span')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.WHITE};
`;