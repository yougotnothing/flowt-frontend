import styled from "styled-components";
import { COLORS } from "../../../consts/colors.const";

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 286px;
  height: 98%;
  background-color: ${COLORS.front};
  padding: 2%;
  border-radius: 20px;
  gap: 2%;
`;

export const FavoriteContainer = styled('div')`
  display: flex;
  width: 306px;
  flex-direction: column;
  height: 78vh;
`;

export const Card = styled('button')`
  padding-left: 4%;
  width: 286px;
  height: 84px;
  display: flex;
  flex-direction: row;
  align-self: center;
  background: none;
  border: 3px solid ${COLORS.input};
  border-radius: 14px;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    border-color: ${COLORS.firstFont};
    cursor: pointer;
  }
`;

export const CardIcon = styled('img')`
  width: 56px;
  height: 56px;
  background: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 56px;
  margin-top: auto;
  margin-bottom: auto;
  align-self: start;
  background-image: url('/androidIcon.jpg');
  border: none;
  border-radius: 14px;
`;

export const CardHeader = styled('div')`
  font-size: 22px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 800;
  letter-spacing: normal;
  color: ${COLORS.firstFontHover};
  margin: auto;
`;

export const Recommendations = styled('div')`
  margin-top: 40px;
  padding: 1%;
  display: flex;
  flex-direction: column;
  height: 340px;
  text-align: start;
  justify-content: end;
  background: linear-gradient(90deg, ${COLORS.container} 0%, ${COLORS.green} 100%);
  border-radius: 20px;
`;

export const Title = styled('div')`
  align-self: start;
  font-family: 'Raleway', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: ${COLORS.firstFontHover};
`;

export const RecommendationsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px;
  width: 780px;
  height: 240px;
  gap: 40px;
`;

export const RecommendationCard = styled('button')`
  display: flex;
  border: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  width: 174px;
  height: 240px;
  background-color: ${COLORS.front};
  gap: 20px;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.frontHover};
    cursor: pointer;
  }
`;

export const RecommendationTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 22px;
  text-align: start;
  text-transform: lowercase;
  justify-content: flex-start;
  color: ${COLORS.firstFont};
  transition: all 0.2s;
  
  &:hover {
    color: ${COLORS.firstFontHover};
  }
`;

export const RecTextContainer = styled('div')`
  gap: 10px;
`;

export const RecommendationsHeader = styled('div')`
  font-size: 20px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  color: ${COLORS.firstFont};
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.firstFontHover};
  }
`;

export const RecommendationsIcon = styled('picture')`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 14px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url('https://avatars.githubusercontent.com/u/114938803?v=');
`;

export const LastListenContainer = styled('div')`
  margin-top: 40px;
  border-radius: 20px;
  width: 411px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 14px;
  background: rgb(70, 147, 177);
  background: linear-gradient(0deg, rgba(70, 147, 177, 1) 0%, rgba(108, 255, 92, 1) 100%);
`;

export const LastListenCard = styled('button')`
  display: flex;
  border: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  width: 100%;
  height: 126px;
  background-color: ${COLORS.front};
  opacity: 0.6;
  gap: 20px;
  transition: all 0.2s;

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;