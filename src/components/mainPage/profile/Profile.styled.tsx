import styled, { keyframes, css } from "styled-components";
import { colors } from "../../../constants/colors.const";
import { OptionsProps } from "./options/Options.styled";
import { BUTTON } from "../../../constants/styles.const";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${colors.BACKGROUND};
  width: 1200px;
  height: max-content;
  margin: 0 auto;
  position: relative;

  @media (max-width: 460px) {
    width: 420px;
    padding: 0;
  }

  .link {
    display: block;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    color: ${colors.DARK_WHITE};
    width: 100%;
    height: 100%;
  
    &:hover {
      color: ${colors.WHITE};
    }
  }
`;

export const Settings = styled('button')<OptionsProps>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  width: 38px;
  height: 38px;
  position: absolute;
  align-self: end;
  animation: ${props => props.$isVisible ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
  background-image: url('/settings.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 46px;
  border: none;
  background-color: ${colors.BACKGROUND};
  transition: 0.5s;
  transform: rotate(180deg);
  cursor: pointer;

  @media (max-width: 460px) {
    width: 29px;
    height: 29px;
    background-size: 38px;
  }

  &:hover {
    transform: rotate(0deg);
  }
`;

interface IUserAvatar {
  $isHaveAvatar: boolean | null;
  $avatar: string | null;
}

export const UserAvatar = styled('picture')<IUserAvatar>`
  width: 244px;
  height: 244px;
  border: none;
  border-radius: 50%;
  background-image: ${props => props.$isHaveAvatar ? `url(${props.$avatar})` : 'url(/defaultAvatar.png)'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 460px) {
    height: 154px;
    width: 154px;
  }
`;

export const DescriptionContainer = styled('div')`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 14px;
  gap: 16px;
  padding: 14px;
  height: 218px;
  width: 30em;

  @media (max-width: 460px) {
    width: 300px;
    padding: 8px;
    gap: 9px;
  }
`;

export const DescriptionTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  color: ${colors.SECONDARY};
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 12px;

  @media (max-width: 460px) {
    font-size: 16px;
  }
`;

export const UserNickname = styled('a')`
  text-align: start;
  font-size: 40px;
  font-weight: 800;
  margin: auto 0;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
  cursor: pointer;

  @media (max-width: 460px) {
    font-size: 26px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const HeadContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
`;

export const UserParams = styled('div')`
  display: flex;
  flex-direction: row;
  align-self: start;
  gap: 24px;
`;

export const ProfileTitle = styled('div')`
  font-size: 19px;
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  font-weight: 500;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 16px;
  }
`;

export const ProfileTextContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const LinksContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;

export const FollowsSubscribes = styled('a')`
  display: block;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  color: ${colors.DARK_WHITE};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: ${colors.WHITE};
  }

  @media (max-width: 460px) {
    font-size: 16px;
  }
`;

export const LikedContainer = styled('div')`
  gap: 24px;
  align-self: start;
  display: flex;
  flex-direction: row;
  text-align: start;
  width: 100%;
  --swiper-navigation-color: ${colors.SECONDARY} !important;

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
`;

interface ISubscribeText {
  $type: 'Username' | 'Region';
}

export const SubscribeTextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SubscribeText = styled('div')<ISubscribeText>`
  font-size: ${props => props.$type === 'Username' ? '22px' : '18px'};
  font-family: 'Urbanist', sans-serif;
  font-weight: ${props => props.$type === 'Username' ? '600' : '400'};
  color: ${props => props.$type === 'Username' ? colors.WHITE : colors.DARK_WHITE};
`;

export const LikedText = styled('div')`
  text-align: start;
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 18px;
    margin-top: 19px;
  }
`;

export const LikedTrackContainer = styled('button')`
  display: flex;
  height: 348px;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: ${colors.FRONT};
  border-radius: 14px;
  color: ${colors.WHITE};
  font-size: 24px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 700;
  transition: all 0.3s;
  cursor: pointer;
  gap: 24px;
  border: none;

  @media (max-width: 460px) {
    font-size: 18px;
    gap: 18px;
    height: max-content;
    padding: 8px;
  }

  &:hover {
    background-color: ${colors.FRONT_HOVER};
    color: ${colors.WHITE}
  }
`;

export const LikedTrackIcon = styled('picture')`
  display: flex;
  align-self: center;
  width: 260px;
  height: 260px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  margin: 1%;
  border-radius: 14px;
  justify-content: start;

  @media (max-width: 460px) {
    height: 180px;
    width: 180px;
  }
`;

export const Description = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: ${colors.WHITE};
  margin: 12px auto auto 0;

  @media (max-width: 460px) {
    font-size: 18px;
    margin: 0 auto auto 0;
  }
`;

export const BorderContainer = styled('div')`
  margin-top: 12px;
  border: 1px solid ${colors.DARK_WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

export const FooterContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 1200px;
  gap: 36px;

  @media (max-width: 460px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const SongsTitle = styled('div')`
  font-size: 26px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 900;
  color: ${colors.SECONDARY};
`;

export const SongContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 660px;
  gap: 12px;
  max-height: 202px;
  overflow-y: auto;
  scrollbar-width: thin;

  @media (max-width: 460px) {
    width: 330px;
  }
`;

export const SongMainContainer = styled('div')`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export interface ISubscribeProp {
  $isVisible: boolean;
}

export const SubscribeButton = styled('button')<ISubscribeProp>`
  ${BUTTON};
  
  opacity: ${({ $isVisible }) => $isVisible ? '1' : '0'};
  align-self: center;
  justify-items: end;
  margin: auto 0 auto auto;
  width: 146px;
  height: 32px;
`;