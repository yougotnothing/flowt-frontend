import React, { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useUserContext } from "../../../contexts/UserContext";
import { userAvatarStore } from "../../../store/toChangeAvatar";

import {
  NoticesContainer,
  Container,
  ButtonsContainer,
  Button,
  Notices,
  NoticeTitle,
  ContentContainer,
  NoticeIcon,
  Title,
  NoticeDataContainer,
  NoticeDataTitle
} from "./Notifications.styled";
export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <Container>
      <Title>Notifications</Title>
      {user &&
        <ContentContainer>
          <ButtonsContainer>
            <Button>Button</Button>
          </ButtonsContainer>
          <NoticesContainer>
            <Notices>
              <NoticeIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
              <NoticeTitle>Title</NoticeTitle>
            </Notices>
          </NoticesContainer>
        </ContentContainer>
      }
    </Container>
  );
};