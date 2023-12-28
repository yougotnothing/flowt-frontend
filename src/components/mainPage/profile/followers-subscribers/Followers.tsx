import { FC } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { 
  Avatar,
  Card,
  Container,
  PageHeader,
  Header,
  Info
} from "./Followers.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../../stores/toUser.mobx";
import { searchUsersStore as searchUsers } from "../../../../stores/toSearchUsers.mobx";

export const Followers: FC = observer(() => {
  const navigate = useNavigate();

  return(
    <Container>
      <PageHeader>Followers</PageHeader>
      {user.followers.map((follower, index) => (
        <Card key={index}
          onClick={() => {
            searchUsers.setUser(follower);
            navigate(generatePath('/profile/:id', { id: follower.username }));
          }}
        >
          <Avatar $userHaveAvatar={follower.userHaveAvatar} $avatar={follower.avatar} />
          <Header>{follower.username}</Header>
          <Info>{follower.region}</Info>
        </Card>
      ))}
    </Container>
  )
});