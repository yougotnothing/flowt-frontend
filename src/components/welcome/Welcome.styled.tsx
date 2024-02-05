import styled from "styled-components";
import { colors } from "../../constants/colors.const";
import { BUTTON, INPUT } from "../../constants/styles.const";

interface InputProps {
  $isError: boolean;
}

export const Wrapper = styled('div')`
  display: flex;
  overflow-y: hidden;
  flex-direction: column;
  align-items: center;
  width: 100svw;
  height: 100svh;
  min-height: 100%;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: auto;
  gap: 46px;
  position: relative;
`;

export const Title = styled('span')`
  font-size: 64px;
  font-weight: 900;
  font-family: 'Mulish', sans-serif;
  background-clip: text;
  background: rgb(174,238,184);
  background: linear-gradient(125deg, rgba(174,238,184,1) 0%, rgba(191,213,255,1) 100%);
  -webkit-background-clip: text;
  color: transparent;
`;

export const RowWrapper = styled('div')`
  width: 1132px;
  height: 560px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 34px;
  border-radius: 42px;
`;

export const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: start;
`;

export const MainInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
`;

interface SpanProps {
  $color?: string;
}

export const Span = styled('span')<SpanProps>`
  font-family: 'Mulish', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: ${({ $color }) => $color ? $color : 'rgba(161, 255, 208, 0.671)'};
`;

interface IconProps {
  $url: string;
}

export const Icon = styled('a')<IconProps>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-image: url(${({ $url }) => $url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

export const TextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

export const LoginWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  width: 450px;
  height: calc(100% - 24px);
`;

export const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

export const Strong = styled('strong')`
  font-size: 28px;
  font-weight: 900;
  font-family: 'Mulish', sans-serif;
  background-clip: text;
  background: linear-gradient(324deg, rgba(183,237,147,1) 0%, #acd0ff 100%); 
  -webkit-background-clip: text;
  color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Button = styled('button')`
  background: none;
  color: ${colors.DARK_WHITE};
  font-weight: 400;
  font-size: 18px;
  font-family: 'Mulish', sans-serif;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom: 1px solid transparent;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #aeeeb8;
    border-color: #aeeeb8;
  }
`;

export const Input = styled('input')<InputProps>`
  ${INPUT}
  background-color: transparent !important;
  width: 268px;
  height: 38px;
  border-color: ${({ $isError }) => $isError ? colors.RED : colors.BORDER};
`;

export const LoginButton = styled('button')`
  ${BUTTON};
  width: 168px;
  height: 36px;
`;

export const Error = styled('span')`
  font-family: 'Mulish', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${colors.RED};
  height: 20px;
`;

interface LinkProps {
  $strong?: boolean;
}

export const Link = styled('a')<LinkProps>`
  font-size: 22px;
  font-weight: 800;
  font-family: 'Mulish', sans-serif;
  background-clip: text;
  color: transparent;
  background: ${({ $strong }) => $strong ? 'transparent' : 'linear-gradient(281deg, #cded93 0%, #acffdf 100%)'};
  -webkit-background-clip: text;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  transition: border-bottom-color 0.3s ease;

  &:hover {
    border-bottom-color: rgba(255, 255, 255, 0.3);
  }
`;

interface LinkWrapperProps {
  $direction: 'row' | 'column';
}

export const LinkWrapper = styled('div')<LinkWrapperProps>`
  background-color: ${({ $direction }) => $direction === 'column' ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  padding: 8px;
  border-radius: 12px;
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: start;
  gap: 12px;
`;
