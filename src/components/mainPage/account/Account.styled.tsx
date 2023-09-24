import styled from "styled-components";
import { COLORS } from "../../../consts/colors.const";
import { TITLE } from "../../../consts/styles.const";

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10em;
  height: calc(99vh - 75px - 64px);
`;

export const Title = styled('div')`${TITLE};`;

export const UserSettingsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 24px;
`;

export const UserSettings = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: start;
  border-radius: 18px;
  background-color: ${COLORS.front};
  width: 260px;
  gap: 38px;
  padding: 21px;
  border: 2px solid ${COLORS.border};
`;

export const AContainer = styled('div')`
  color: ${COLORS.firstFontHover};
  padding: 5px;
  border-radius: 8px;
  width: max-content;
  
  &:hover {
    background-color: ${COLORS.grey};
    color: ${COLORS.secondaryHover};
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
    border: 1px solid ${COLORS.secondaryHover};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const InfoContainer = styled('div')`
  overflow-y: scroll;
  align-self: center;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 24px;
  padding: 4px;
  text-align: start;
  height: 100%;
  
  &::-webkit-scrollbar {
    opacity: 0;
  }
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
  border: 2px solid ${COLORS.border};
  box-shadow: 0px 0px 3px 1px ${COLORS.border};
  background: linear-gradient(90deg, ${COLORS.grey} 0%, ${COLORS.secondary} 100%);
`;

export const UserAvatar = styled('picture')`
  width: 286px;
  height: 286px;
  background: none;
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
  color: ${COLORS.firstFontHover};
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
  color: ${COLORS.firstFontHover};
`;

export const DescriptionContainer = styled('div')`
  display: flex;
  width: 66em;
  flex-direction: column;
  align-items: start;
  padding: 12px;
  gap: 24px;
  border: 2px solid ${COLORS.border};
  border-radius: 12px;
  background-color: ${COLORS.front};
`;

export const Description = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: ${COLORS.firstFontHover};
`;

export const DescriptionTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: ${COLORS.secondary};
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
  color: ${COLORS.firstFontHover};
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PlaylistContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  gap: 24px;
`;