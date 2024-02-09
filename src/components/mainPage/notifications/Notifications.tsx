import { FC } from "react";

import {
  NoticesContainer,
  Container,
  NoticeTitle,
  ContentContainer,
  Title,
} from "./Notifications.styled";
import { notificationsStore as notices } from "../../../stores/toNotifications.mobx";
import { observer } from "mobx-react-lite";
import { Droplist } from "./Droplist";
import { user } from "../../../stores/toUser.mobx";

export const Notifications: FC = observer(() => {
  return (
    <Container>
      <Title>Notifications</Title>
      {user && (
        <ContentContainer>
          <NoticesContainer>
            {notices.container.length > 0 ? <Droplist $isOpen={false}/>
             : 
            <NoticeTitle>You have no notifications.</NoticeTitle>}
          </NoticesContainer>
        </ContentContainer>
      )}
    </Container>
  );
});