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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
  z-index: 9999;
  width: 100%;

  @media (max-width: 460px) {
    font-size: ${({ $type }) => $type === 'author' ? '14px' : '18px'};
  }

  &:hover {
    color: ${colors.WHITE};
  }
`;

export const Title = styled('div')`
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 20px;
  }
`;

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  position: relative;
  align-items: start;
  margin: 0 auto;

  @media (max-width: 460px) {
    width: 100%;
  }
`;

export const LikedSongs = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${colors.FRONT};
  border-radius: 12px;
  padding: 8px;
  width: 200px;
  max-height: 360px;
  overflow-y: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    
  }
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
  background-image: url(${({ $author, $name, $playlist }) => ($playlist ? encodeURI(`${API_URL}/images/playlist/${$author}/${$name}`) : encodeURI(`${API_URL}/images/song/${$author}/${$name}`))});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
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
  width: 100px;
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
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  .swiper-wrapper {
    padding: 0;
    margin: 0;
    width: 100% !important;
  }

  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 50%;
  }
  --swiper-navigation-color: ${colors.SECONDARY} !important;

  @media (max-width: 460px) {
    width: 100%;
    gap: 14px;

    .swiper-wrapper {
      align-self: flex-start;
      padding: 0 !important;
      margin: 0 !important;
    }

    .swiper-button-next {
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
    }
  }
`;

export const Recommendation = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: ${colors.FRONT};
  padding: 12px;
  border-radius: 14px;
  width: 620px;

  @media (max-width: 460px) {
    width: calc(100% - 14px);
    padding: 7px;
    border-radius: 8px;
  }
`;

export const RecommendationCard = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 460px) {
    border-radius: 6px;
    gap: 4px;
    padding: 6px;
  }
`;

export const RecommendationIcon = styled('button')<UrlProps>`
  width: 164px;
  height: 164px;
  background-image: url(${({ $author, $name }) => encodeURI(`${API_URL}/images/song/${$author}/${$name}`)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  border: none;
  padding: 0;
  cursor: pointer;

  &::after {
    display: flex;
    opacity: 0;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    background-image: url(/play_hover.png);
    background-position: center;
    background-size: 54px;
    background-repeat: no-repeat;
    transition: opacity 0.3s ease;
    border-radius: 8px;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 460px) {
    height: 102px;
    width: 102px;

    &::after {
      background-size: 26px;
    }
  }
`;

export const RecommendationTitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background-color: ${colors.DARK_BLUE};
  width: 100%;
  border-radius: 8px;
`;

interface ContainerProps {
  $size: 'small' | 'big';
}

export const Container = styled('div')<ContainerProps>`
  display: ${({ $size }) => $size === 'big' ? 'flex' : 'none'};
  flex-direction: column;
  align-items: start;
  gap: 24px;

  @media (max-width: 460px) {
    display: ${({ $size }) => $size === 'small' ? 'flex' : 'none'};
    gap: 12px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

export const MobileContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface SpanProps {
  $size: string;
}

export const Span = styled('span')<SpanProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: ${({ $size }) => `${$size}px`};
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: ${({ $size }) => $size === '22' ? '16px' : '14px'};
  }
`;
