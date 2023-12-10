import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../../../../api/axiosConfig";

import { 
  Avatar,
  Card,
  Container
} from "./Followers.styled";
import { URLS } from "../../../../constants/urls.const";
import { observer } from "mobx-react-lite";
import { user } from "../../../../stores/toUser.mobx";

export const Followers: FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();

  return(
    <Container>
      {user.followers.map((follower, index) => (
        <Card key={index}>
          <Avatar style={{backgroundImage: `url(${follower.userHaveAvatar ? follower.avatar : '/defaultAvatar.png'})`}}/>
        </Card>
      ))}
    </Container>
  )
});