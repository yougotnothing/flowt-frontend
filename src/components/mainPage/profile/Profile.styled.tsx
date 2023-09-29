import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${colors.BACKGROUND};
  width: 1200px;
  height: max-content;
  margin: 0 auto;

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

export const Settings = styled('button')`
  position: absolute;
  align-self: end;
  width: 38px;
  height: 38px;
  background-image: url('/settings.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 46px;
  border: none;
  background-color: ${colors.BACKGROUND};
  transition: all 0.5s;
  transform: rotate(180deg);
  cursor: pointer;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const UserAvatar = styled('picture')`
  width: 244px;
  height: 244px;
  border: none;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SwitchTheme = styled('button')`
  width: 146px;
  height: 48px;
  color: ${colors.DARK_WHITE};
  background-color: ${colors.SECONDARY};
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin: auto; 
  align-self: start;

  &:hover {
    color: ${colors.WHITE};
    background-color: ${colors.SECONDARY_HOVER};
  }
`;

export const DescriptionContainer = styled('div')`
  margin: 34px auto 34px 0;
  display: flex;
  flex-direction: column;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 14px;
  gap: 16px;
  padding: 14px;
  height: 14em;
  width: 38em;
`;

export const DescriptionTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  color: ${colors.SECONDARY};
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 12px;
`;

export const UserNickname = styled('a')`
  text-align: start;
  font-size: 40px;
  font-weight: 800;
  margin-top: auto;
  margin-bottom: auto;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
  cursor: pointer;
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
`;

export const LikedContainer = styled('div')`
  gap: 24px;
  align-self: start;
  display: flex;
  flex-direction: row;
  text-align: start;
`;

export const LikedText = styled('div')`
  text-align: start;
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
`;

export const LikedTrackContainer = styled('div')`
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
`;

export const Description = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: ${colors.WHITE};
  margin: 12px auto auto 0;
`;

export const BorderContainer = styled('div')`
  margin-top: 12px;
  border: 1px solid ${colors.DARK_WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;