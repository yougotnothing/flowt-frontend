import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";
import { ISongData } from "../../../types/types";
import { API_URL } from "../../../api/axiosConfig";

interface ISongInfo {
  $type: 'name' | 'else';
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;

  @media (max-width: 460px) {
    width: 96%;
    margin: 0;
    gap: 14px;
  }
`;

export const SongDataWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rem;

  @media (max-width: 460px) {
    gap: 12px;
  }
`;

export const Song = styled('div')`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 1168px;
  gap: 6em;
  padding: 1em;
  background: linear-gradient(100deg, ${colors.SECONDARY} 0%, ${colors.AQUAMARINE} 30%, ${colors.DARK_BLUE} 120%);
  border-radius: 12px;

  @media (max-width: 460px) {
    width: 100%;
    padding: 6px;
    border-radius: 8px;
    gap: initial;
    justify-content: space-between;
  }
`;

interface ISongAvatar {
  $src: ISongData;
}

export const SongAvatar = styled('picture')<ISongAvatar>`
  background-size: cover;
  background-position: center;
  background-image: url(${({ $src }) => encodeURI(`${API_URL}/images/song/${$src.author}/${$src.name}`)});
  width: 280px;
  height: 280px;
  border-radius: 8px;
  border: none;

  @media (max-width: 460px) {
    width: 125px;
    height: 125px;
  }
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1em;

  @media (max-width: 460px) {
    gap: 8px;
  }
`;

export const SongInfo = styled('div')<ISongInfo>`
  font-family: 'Raleway', sans-serif;
  font-weight: ${props => props.$type === 'name' ? '800' : '600'};
  font-size: ${props => props.$type === 'name' ? '32px' : '18px'};
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: ${props => props.$type === 'name' ? '20px' : '13px'};
  }
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (max-width: 460px) {
    gap: 14px;
  }
`;

export const SongButton = styled('button')`
  width: 142px;
  height: 36px;
  ${BUTTON}

  @media (max-width: 460px) {
    width: 26px;
    height: 26px;
    background-image: url(/play_hover.png);
    background-color: transparent;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    color: transparent;

    &:hover {
      color: transparent;
      background-color: transparent;
      translate: initial;
    }
  }
`;

interface LikeButtonProps {
  $isLiked: boolean;
}

export const LikeButton = styled('button')<LikeButtonProps>`
  height: 32px;
  width: 32px;
  background-color: transparent;
  background-image: ${({ $isLiked }) => $isLiked ? 'url(/like_hover.png)' : 'url(/like.png)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 460px) {
    width: 25px;
    height: 25px;
  }
`;

export const SongDataContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1em;
  padding: 1em;
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  background-color: ${colors.FRONT};

  @media (max-width: 460px) {
    width: 93%;
  }
`;

export const SongDataSpan = styled('span')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.SECONDARY};
`;

export const SongData = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const RandomSongsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const RandomSong = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  transition: 0.3s ease;
  padding: 6px;
  border-radius: 8px;
  width: calc(100% - 12px);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const RandomSongAvatar = styled('button')<ISongAvatar>`
  width: 145px;
  height: 145px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ $src }) => `${API_URL}/images/song/${$src.author}/${$src.name}`});
  border-radius: 6px;
  padding: 0;
  cursor: pointer;

  &::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url(/play_hover.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 63px;
    opacity: 0;
    transition: 0.3s ease;
    cursor: pointer;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const RandomSongDataWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

export const Line = styled('div')`
  width: 100%;
  border-bottom: 2px solid ${colors.WHITE};

  @media (max-width: 460px) {
    width: 95svw;
  }
`;

interface RandomSongDataProps {
  $name?: boolean;
}

export const RandomSongData = styled('button')<RandomSongDataProps>`
  font-size: ${({ $name }) => $name ? '18px' : '16px'};
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${({ $name }) => $name ? colors.WHITE : colors.DARK_WHITE};
  transition: 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const RandomSongWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

`;

interface RandomSongButtonProps {
  $like?: boolean;
  $type: "play" | "like";
}

export const RandomSongButton = styled('button')<RandomSongButtonProps>`
  width: 34px;
  height: 34px;
  border: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  background-image: ${({ $like, $type }) => 
    $type === 'like' 
    ? (
        $like === true
        ? 'url(/like_hover.png)'
        : 'url(/like.png)'        
      ) 
    : 'url(/play_hover.png)'};
  cursor: pointer;

  @media (max-width: 460px) {
    height: 25px;
    width: 25px;
  }
`;

export const Droplist = styled('button')`
  width: 34px;
  height: 34px;
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: transparent;
  background-image: url(/settings.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

interface DroplistContainerProps {
  $isOpen: boolean;  
}

export const DroplistContainer = styled('div')<DroplistContainerProps>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  position: absolute;
  top: 42px;
  right: 18px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  padding: 6px;
  background-color: ${colors.FRONT};
  border-color: ${colors.BORDER};
`;

export const DroplistButton = styled('button')<DroplistContainerProps>`
  ${BUTTON}
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  position: absolute;
  top: 42px;
  right: 18px;
  width: 124px;
  height: 34px;
  translate: initial !important;
  border: none;
`;