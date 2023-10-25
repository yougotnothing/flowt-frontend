import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useUserContext } from "../../../contexts/UserContext";
import { userAvatarStore } from "../../../store/toChangeAvatar";
import noticeData from "../../../json/notice.json";

import {
  NoticesContainer,
  Container,
  Notices,
  NoticeTitle,
  ContentContainer,
  NoticeIcon,
  Title,
  NoticeNav,
  SortButton,
  ReadIcon,
  SortButtonContainer, Droplist, DroplistItem
} from "./Notifications.styled";
import { URLS } from "../../../constants/urls.const";
import { notificationsStore as notices } from "../../../store/toNotifications";
import { observer } from "mobx-react-lite";
import { Droplist_ } from "./Droplist";

export const Notifications: React.FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();
  const { user } = useUserContext();

  return (
    <Container>
      <Title>Notifications</Title>
      {user && (
        <ContentContainer>
          <NoticeNav>
            <SortButtonContainer>
              <ReadIcon />
              <SortButton>All</SortButton>
            </SortButtonContainer>
            <SortButtonContainer>
              <ReadIcon />
              <SortButton>Read</SortButton>
            </SortButtonContainer>
          </NoticeNav>
          <NoticesContainer>
            <Droplist_ $isOpen={false} />
          </NoticesContainer>
        </ContentContainer>
      )}
    </Container>
  );
});