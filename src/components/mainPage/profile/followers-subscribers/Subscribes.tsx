import { FC } from "react";

import { generatePath, useNavigate } from "react-router-dom";
import { Container, Avatar, Card, Header, PageHeader, Info, ContentWrapper } from "./Followers.styled";
import { observer } from "mobx-react-lite";
import { searchUsersStore as searchUsers } from "../../../../stores/toSearchUsers.mobx";
import { user } from "../../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../../helmet";

export const Subscribers: FC = observer(() => {
  const navigate = useNavigate();

  return(
    <Container>
      <Helmet title={`Subscribes: ${user.username}`} />
      <PageHeader>Subscribes</PageHeader>
      <ContentWrapper>
        {user.subscribes.map((subscribe, index) => (
          <Card key={index}
          onClick={() => {
            searchUsers.setUser(subscribe);
            navigate(generatePath('/profile/:id', { id: searchUsers.username }));
          }}>
            <Avatar $userHaveAvatar={subscribe.userHaveAvatar} $avatar={subscribe.avatar} />
            <Header>{subscribe.username}</Header>
            <Info>{subscribe.region}</Info>
          </Card>
        ))}
      </ContentWrapper>
    </Container>
  )
});
