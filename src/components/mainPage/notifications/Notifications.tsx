import React, { useEffect, useState } from "react";
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
import { URLS } from "../../../constants/urls.const";
import { notificationsStore as notices } from "../../../store/toNotifications";
import { observer } from "mobx-react-lite";

export const Notifications: React.FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();
  const { user } = useUserContext();

  return (
    <Container>
      <Title>Notifications</Title>
      {user && (
        <ContentContainer>
          <ButtonsContainer>
            <Button>Button</Button>
          </ButtonsContainer>
          <NoticesContainer>
            {notices.container.map((notice, index) => (
              <Notices key={index}>
                <NoticeIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
                <NoticeTitle>{notice.message}</NoticeTitle>
              </Notices>
            ))}
          </NoticesContainer>
        </ContentContainer>
      )}
    </Container>
  )
});