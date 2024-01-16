import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { ISongData } from "../../../../types/types";
import { API_URL } from "../../../../api/axiosConfig";

interface ISongLike {
  $isLiked: boolean;
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  width: 1200px;
  margin: 0 auto;
`;

export const Header = styled('div')`
  font-weight: 800;
  font-size: 26px;
  font-family: 'Raleway', sans-serif;
  color: white;
`;

export const Border = styled('div')`
  width: 100%;
  border-bottom: 2px solid white;
`;

export const Song = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 8px * 2);
  padding: 8px;
  background-color: transparent;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const SongDataContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SongData = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const SongDataButton = styled('button')`
  background-color: transparent;
  text-decoration: none;
  color: ${colors.WHITE};
  border: none;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface ISongImage {
  $song: ISongData;
}

export const SongImage = styled('button')<ISongImage>`
  background-image: ${p => `url(${API_URL}/images/song/${p.$song.author}/${p.$song.name})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  border-radius: 8px;
  width: 120px;
  height: 120px;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &::after {
    content: "";
    opacity: 0;
    height: 120px;
    width: 120px;
    border-radius: 8px;
    background-size: 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/play.png');
    transition: 0.3s ease;
    margin: 0;
    padding: 0;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

export const SongLikesContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const SongLikeButton = styled('button')<ISongLike>`
  background-image: url(${p => p.$isLiked ? '/like_hover.png' : '/like.png'});
  background-size: 20px;
  background-position: center;
  background-color: ${p => p.$isLiked ? colors.AQUAMARINE : 'transparent'};
  border: none;
  cursor: pointer;
  border-radius: 6px;
  width: 34px;
  height: 34px;
  background-repeat: no-repeat;
`;

export const SongLikeData = styled('div')`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};
`;