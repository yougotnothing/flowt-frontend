import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";

export const Container = styled('div')`
  display: flex;
  margin: auto;
  flex-direction: column;
  width: 1200px;
  background-color: ${colors.BACKGROUND};
  gap: 24px;
`;

export const Card = styled('button')`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  padding: 24px;
  gap: 24px;
  border-radius: 16px;
  background-color: ${colors.FRONT};
  color: ${colors.WHITE};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${colors.FRONT_HOVER};
    color: ${colors.DARK_WHITE};
  }
`;

interface IAvatar {
  $avatar: string | null;
  $userHaveAvatar: boolean | null;
}

export const Avatar = styled('picture')<IAvatar>`
  width: 180px;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => props.$userHaveAvatar ? `url(${props.$avatar})` : 'url(/defalutAvatar.png)'};
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
  color: ${colors.WHITE};
`;

export const Info = styled('div')`
  font-weight: 600;
  font-size: 16px;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;
