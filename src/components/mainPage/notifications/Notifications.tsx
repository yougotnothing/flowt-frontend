import { FC } from "react";

import {
  NoticesContainer,
  Container,
  NoticeTitle,
  ContentContainer,
  Title,
  NoticeNav,
  SortButton,
  ReadIcon,
  SortButtonContainer
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
            {notices.container.length > 0 ? <Droplist $isOpen={false}/>
             : 
            <NoticeTitle>You have no notifications.</NoticeTitle>}
          </NoticesContainer>
        </ContentContainer>
      )}
    </Container>
  );
});