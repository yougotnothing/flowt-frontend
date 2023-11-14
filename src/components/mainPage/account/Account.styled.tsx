import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { TITLE } from "../../../constants/styles.const";

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  gap: 10em;
`;

export const Title = styled('div')`
  ${TITLE};
`;

export const UserSettingsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 24px;
`;

export const UserSettings = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: start;
  border-radius: 18px;
  background-color: ${colors.FRONT};
  width: 260px;
  gap: 38px;
  padding: 21px;
`;

export const AContainer = styled('div')`
  color: ${colors.WHITE};
  padding: 5px;
  border-radius: 8px;
  width: max-content;
  
  &:hover {
    background-color: ${colors.VERY_DARK_BLUE};
    color: ${colors.SECONDARY_HOVER};
  }
`;

export const A = styled('a')`
  cursor: pointer;
  border: none;
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 22px;
  transition: all 0.3s;
  
  &:hover {
    border: 1px solid ${colors.SECONDARY_HOVER};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const UserInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;

export const InfoContainer = styled('div')`
  align-self: center;
  height: max-content;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 24px;
  padding: 0 4px 4px 4px;
  text-align: start;
`;

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 6em;
  align-items: start;
  align-self: start;
  width: 63em;
  padding: 36px;
  border-radius: 18px;
  max-height: 400px;
  background: linear-gradient(135deg, ${colors.DARK_BLUE} 0% , ${colors.AQUAMARINE} 60%, ${colors.SECONDARY_HOVER} 120%);
`;

export const UserAvatar = styled('picture')`
  width: 286px;
  height: 286px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

export const UserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  gap: 26px;
`;

export const Username = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 70px;
  text-align: start;
  background: none;
  border: none;
  color: ${colors.WHITE};
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Region = styled('div')`
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${colors.WHITE};
`;

export const DescriptionContainer = styled('div')`
  display: flex;
  width: 66em;
  flex-direction: column;
  align-items: start;
  padding: 12px;
  gap: 24px;
  border-bottom: 1px solid ${colors.SECONDARY};
`;

export const Description = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: ${colors.WHITE};
`;

export const DescriptionTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: ${colors.SECONDARY};
`;

export const Email = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;
`;

export const StatsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: max-content;
  gap: 12px;
  color: ${colors.WHITE};
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PlaylistContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  gap: 24px;
`;

export const NavigationContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  border-bottom: 1px solid ${colors.WHITE};
  gap: 8px;
`;

export const NavigationButton = styled.button`
  background-color: transparent;
  color: ${colors.WHITE};
`;