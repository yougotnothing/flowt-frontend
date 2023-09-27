import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 286px;
  height: 98%;
  background-color: ${colors.DARK_BLUE};
  padding: 2%;
  border-radius: 20px;
`;

export const FavoriteContainer = styled('div')`
  display: flex;
  width: 306px;
  flex-direction: column;
  height: 78vh;
`;

export const Card = styled('button')`
  margin: 12px;
  gap: 24px;
  width: 90%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-self: center;
  border: none;
  background-color: ${colors.GREY};
  color: ${colors.DARK_WHITE};
  border-radius: 14px;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.GREEN};
    color: ${colors.WHITE};
  }
`;

export const CardIcon = styled('picture')`
  width: 56px;
  height: 56px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: auto;
  margin-bottom: auto;
  align-self: start;
  border: none;
  border-radius: 14px;
`;

export const CardHeader = styled('div')`
  margin: auto;
  padding-right: 12px;
  font-size: 22px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 800;
  letter-spacing: normal;
`;

export const Recommendations = styled('div')`
  margin-top: 40px;
  padding: 1%;
  display: flex;
  flex-direction: column;
  height: 340px;
  text-align: start;
  justify-content: end;
  background: linear-gradient(90deg, ${colors.AQUAMARINE} 0%, ${colors.GREEN} 100%);
  border-radius: 20px;
`;

export const Title = styled('div')`
  align-self: start;
  font-family: 'Raleway', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: ${colors.WHITE};
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
  background-color: ${colors.FRONT};
  color: ${colors.DARK_WHITE};
  gap: 20px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BACKGROUND};
    color: ${colors.WHITE};
  }
`;

export const RecommendationTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 22px;
  text-align: start;
  text-transform: lowercase;
  justify-content: flex-start;
  transition: all 0.2s;
`;

export const RecTextContainer = styled('div')`
  gap: 10px;
`;

export const RecommendationsHeader = styled('div')`
  font-size: 20px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  transition: all 0.3s;
`;

export const RecommendationsIcon = styled('picture')`
  width: 140px;
  height: 140px;
  border-radius: 14px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  background-color: ${colors.FRONT};
  opacity: 0.6;
  gap: 20px;
  transition: all 0.2s;

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;