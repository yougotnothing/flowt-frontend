import styled from "styled-components";
import { COLORS } from "../../../consts/colors.const";
import { TITLE } from "../../../consts/styles.const";

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 38px;
  width: 100%;
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
  width: 286px;
  flex-direction: column;
  align-self: start;
  align-items: start;
  border-radius: 18px;
  background-color: ${COLORS.front};
  padding: 24px;
  gap: 38px;
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
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 24px;
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
  font-weight: 800;
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
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${COLORS.firstFontHover};
`;

export const DescriptionContainer = styled('div')`
  display: flex;
  width: max-content;
  flex-direction: column;
  align-items: start;
  padding: 12px;
  gap: 24px;
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
  background-image: linear-gradient(90deg, ${COLORS.secondaryHover} 0%, ${COLORS.green} 50%);
  color: transparent;
  background-clip: text;
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

