import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { BUTTON } from "../../../../constants/styles.const";

interface IStats {
  $type: 'header' | 'content';
}

export const Header = styled('div')`
  font-size: 26px;
  font-weight: 800;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 1200px;
  gap: 26px;
  margin: 0 auto;
`;

export const Navbar = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 42px;
  border-bottom: 2px solid ${colors.BORDER};
  width: 100%;
  align-items: start;
  padding-bottom: 6px;
`;

interface INavButton {
  $isPrimary: boolean;
}

export const NavButton = styled('button')<INavButton>`
  background: none;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  border: none;
  width: 100px;
  height: 32px;
  background-color: ${({ $isPrimary }) => $isPrimary ? colors.BORDER : 'transparent'};
  border-radius: 32px;
  color: ${({ $isPrimary }) => $isPrimary ? colors.SECONDARY : colors.DARK_WHITE};
  border: 2px solid ${({ $isPrimary }) => $isPrimary ? colors.SECONDARY : 'transparent'};
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: ${({ $isPrimary }) => !$isPrimary ? colors.WHITE : colors.SECONDARY_HOVER};
  }
`;

export const StatsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  padding: 8px;
`;

export const Stats = styled('span')<IStats>`
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: ${({ $type }) => $type === 'header' ? '800' : '600'};
  color: ${({ $type }) => $type === 'header' ? colors.DARK_WHITE : colors.WHITE};
`;