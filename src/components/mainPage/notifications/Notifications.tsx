import React, { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useContextValues } from "../../../contexts/Context";
import {
  NoticesContainer,
  Container,
  ButtonsContainer,
  Button,
  Notices,
  NoticeTitle,
  ContentContainer,
  NoticeIcon,
  NoticeDataContainer,
  NoticeDataTitle
} from "./Notifications.styled";
export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { user, userAvatar } = useContextValues();

  return (
    <Container>
      {user &&
        <ContentContainer>
          <ButtonsContainer>
            <Button>Button</Button>
          </ButtonsContainer>
          <NoticesContainer>
            <Notices>
              <NoticeIcon style={{backgroundImage: `url(${userAvatar})`}} />
              <NoticeTitle>Title</NoticeTitle>
            </Notices>
          </NoticesContainer>
        </ContentContainer>
      }
    </Container>
  );
};