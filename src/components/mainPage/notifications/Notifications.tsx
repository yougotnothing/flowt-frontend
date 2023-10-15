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
import { api } from "../../../api/axiosConfig";
import { INotice, NoticeProps } from "../../../types/props";
export const Notifications: React.FC = () => {
  const notifications: INotice[] = [];
  const navigate = useNavigate();
  const { user } = useUserContext();

  const getNotifications = async () => {
    try {
      const response = await api.get('/users/notifications ');
      notifications.push(response.data);
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotifications();
  }, [user]);

  return (
    <Container>
      <Title>Notifications</Title>
      {user && (
        <ContentContainer>
          <ButtonsContainer>
            <Button>Button</Button>
          </ButtonsContainer>
          <NoticesContainer>
            {notifications.map((notice: NoticeProps, index: number) => (
              <Notices key={index}>
                <NoticeIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
                <NoticeTitle>{notice.title}</NoticeTitle>
              </Notices>
            ))}
          </NoticesContainer>
        </ContentContainer>
      )}
    </Container>
  );
};