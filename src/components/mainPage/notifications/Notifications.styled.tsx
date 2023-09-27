import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON, TITLE, INPUT } from "../../../constants/styles.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 1200px;
  align-self: center;
  margin: auto;
  gap: 36px;
`;

export const ContentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  width: 25%;
  flex-direction: column;
  align-items: start;
  border: 2px solid ${colors.BORDER};
  border-radius: 16px;
  padding: 12px;
  gap: 14px;
`;

export const Button = styled('button')`
  ${BUTTON};
  
  width: 140px;
  height: 42px;
`;

export const NoticesContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 18px;
  border: 2px solid ${colors.BORDER};
  border-radius: 18px;
  width: 75%;
`;

export const Notices = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 14px;
  gap: 24px;
  border: 2px solid ${colors.WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  background-color: ${colors.FRONT};
`;

export const Title = styled('div')`
  ${TITLE};
`;

export const NoticeTitle = styled('div')`
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  color: ${colors.WHITE};
`;

export const NoticeIcon = styled('picture')`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const NoticeDataContainer = styled('div')`
  display: flex;
  flex-direction: row;
  background-color: ${colors.GREY};
  border-radius: 6px;
`;

export const NoticeDataTitle = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.WHITE};
`;