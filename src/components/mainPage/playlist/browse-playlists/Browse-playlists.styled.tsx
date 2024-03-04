import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { IPlaylist } from "../../../../types/props";
import { API_URL } from "../../../../api/axiosConfig";

interface BrowsePlaylistsProps {
  $text_type?: 'header' | 'paragraf';
  $text_weight?: 'thin' | 'bold';
  $icon_url?: IPlaylist;
}

interface CardIconProps {
  $icon_url: IPlaylist;
}

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1200px;
  margin: 0 auto;
  gap: 24px;

  @media (max-width: 460px) {
    margin: 0;
    width: 96%;
  }
`;

export const Text = styled('div')<BrowsePlaylistsProps>`
  font-family: 'Urbanist', sans-serif;
  font-weight: ${({ $text_weight }) => $text_weight === 'bold' ? 600 : 400};
  font-size: ${({ $text_type }) => $text_type === 'paragraf' ? '24px' : '16px'};
  color: white;

  @media (max-width: 460px) {
    font-size: ${({ $text_type }) => $text_type === 'paragraf' ? '19px' : '14px'};
  }
`;

export const CardsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 24px;

  @media (max-width: 460px) {
    gap: 14px;
  }
`;

export const Card = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 6px;
  border-radius: 8px;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.DARK_BLUE};
  cursor: pointer;

`;

export const CardIcon = styled('picture')<CardIconProps>`
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  background-image: url(${({ $icon_url: { username, name } }) => `${API_URL}/images/playlist/${username}/${name}`});
  background-repeat: no-repeat;
  border-radius: 8px;

  &::after {
    content: "";
    opacity: 0;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    background-image: url(/play.png);
    background-repeat: no-repeat;
    background-size: 46px;
    background-position: center;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 460px) {
    height: 120px;
    width: 120px;
  }
`;