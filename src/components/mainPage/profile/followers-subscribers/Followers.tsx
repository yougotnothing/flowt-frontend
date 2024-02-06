import { FC } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { 
  Avatar,
  Card,
  Container,
  PageHeader,
  Header,
  Info,
  ContentWrapper
} from "./Followers.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../../stores/toUser.mobx";
import { searchUsersStore as searchUsers } from "../../../../stores/toSearchUsers.mobx";
import { Title as Helmet } from "../../../../helmet";

export const Followers: FC = observer(() => {
  const navigate = useNavigate();

  return(
    <Container>
      <Helmet title={`Followers: ${user.username}`} />
      <PageHeader>Followers</PageHeader>
      <ContentWrapper>
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
      </ContentWrapper>
    </Container>
  )
});