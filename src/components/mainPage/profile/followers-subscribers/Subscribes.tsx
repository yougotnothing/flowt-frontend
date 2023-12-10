import { FC } from "react";

import { generatePath, useNavigate } from "react-router-dom";
import { Container, Avatar, Card, Header, PageHeader } from "./Followers.styled";
import { observer } from "mobx-react-lite";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";
import { user } from "../../../../stores/toUser.mobx";

export const Subscribers: FC = observer(() => {
  const navigate = useNavigate();

  return(
    <Container>
      <PageHeader>Subscribes</PageHeader>
      {user.subscribes.map((subscribe, index) => (
        <Card key={index}
          onClick={() => {
            searchUsersStore.setUser(subscribe);
            navigate(generatePath('/profile/:id', {id: searchUsersStore.username}));
          }}>
          {subscribe.userHaveAvatar ? 
            <Avatar style={{backgroundImage: `url(${subscribe.avatar})`}} />
            :
            <Avatar style={{backgroundImage: 'url(/defaultAvatar.png)'}} />
          }
          <Header>{subscribe.username}</Header>
        </Card>
      ))}
    </Container>
  )
});