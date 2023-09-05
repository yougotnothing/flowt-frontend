import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../../../../api/axiosConfig";

import { 
  Avatar,
  Card,
  Container
} from "./followers.styled";

export const Followers: React.FC = () => {
  const[followers, setFollowers] = useState<any>([]);
  const navigate = useNavigate();
  let counter: number = 0;

  const getFollowers = async () => {
    const response = await api.get('/users/followers');
    setFollowers(response.data.followers);
  }

  useEffect(() => { getFollowers(); }, []);

  return(
    <Container>
      {followers.map((follower: any) => (
        <Card key={++counter}>
          <Avatar style={{
            backgroundImage: `url(${API_URL}/images/user/${follower.username})`
            }}
          />
        </Card>
      ))}
    </Container>
  )
}