import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, API_URL } from "../../../../api/axiosConfig";
import { Container, Avatar, Card, Header, PageHeader } from "./followers.styled";

export const Subscribers: React.FC = () => {
  const navigate = useNavigate();
  const[subscribes, setSubscribes] = useState<any>([]);
  let counter: number = 0;

  const getSubscribes = async () => {
    const response = await api.get('/users/subscribes');
    setSubscribes(response.data.subscribes);
  }

  useEffect(() => {
    getSubscribes();
  }, []);

  return(
      <Container>
      <PageHeader>Subscribes</PageHeader>
        {subscribes.map((subscribe: any) => (
          <Card key={++counter}>
            <Avatar style={{
              backgroundImage: `url(${API_URL}/images/user/${subscribe})`
            }} />
            <Header>{subscribe}</Header>
          </Card>
        ))}
      </Container>
  )
}