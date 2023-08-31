import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.background};
`;

export const Card = styled('button')`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-auto;
  align-self: flex-start;
  padding: 24px;
  gap: 24px;
  border-radius: 16px;
  background-color: ${COLORS.front};
  color: ${COLORS.firstFontHover};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.frontHover};
    color: ${COLORS.firstFont};
  }
`;

export const Avatar = styled('picture')`
  width: 180px;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
`;

export const Header = styled('div')`
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 28px;
  font-weight: 800;
`;

export const PageHeader = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-size: 34px;
  font-weight: 900;
`;