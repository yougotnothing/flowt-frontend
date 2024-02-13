import styled from "styled-components";

interface IOAuthButtonProps {
  $type: 'facebook' | 'google';
  $whereUsing?: 'Sign in' | 'Sign up'; 
}

export const OAuthButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 8px;

  @media (max-width: 460px) {
    gap: 5px;
  }
`;

export const OAuthIcon = styled('picture')<IOAuthButtonProps>`
  background-image: ${props => props.$type === 'google' ? 'url(icons8-google.svg)' : 'url(icons8-facebook.svg)'};
  width: 24px;
  height: 24px;
  margin-left: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;

  @media (max-width: 460px) {
    width: 20px;
    height: 20px;
    background-size: 16px;
  }
`;

export const OAuthButton = styled('a')<IOAuthButtonProps>`
  background-color: ${props => props.$type === 'google' ? '#fff' : '#385898'};
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  border-radius: 6px;
  width: 150px;
  height: 42px;
  gap: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.$type === 'google' ? '#b0b0b0' : '#2f4a7f'};
  }

  @media (max-width: 460px) {
    width: 115px;
    height: 35px;
  }
`;

export const OAuthText = styled('div')<IOAuthButtonProps>`
  color: ${props => props.$type === 'google' ? '#161616' : '#fff'};
  width: 100px;
  align-self: center;
  font-size: 14px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;

  @media (max-width: 460px) {
    font-size: 12px;
    font-weight: 600;
  }
`;