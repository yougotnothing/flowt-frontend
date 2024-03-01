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
  align-items: center;
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
`;

export const CardIcon = styled('picture')<CardIconProps>`
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  background-image: url(${({ $icon_url: { author, name } }) => `${API_URL}/images/playlist/${author}/${name}`});
  background-repeat: no-repeat;
  border-radius: 8px;

  @media (max-width: 460px) {
    height: 120px;
    width: 120px;
  }
`;