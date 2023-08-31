import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, API_URL } from "../../../../api/axiosConfig";
import { Container, Avatar, Card, Header, PageHeader } from "./followers.styled";

export const Subscribers: React.FC = () => {
  const navigate = useNavigate();
  const[subscribes, setSubscribes] = useState<any>([]);

  const getSubscribes = async () => {
    const response = await api.get('/users/subscribes');
    setSubscribes(response.data.subscribes);
  }

  useEffect(() => {
    if(subscribes.length === 0) {
      getSubscribes();
    }else if(subscribes.status === 401) {
      window.location.reload();
    }
  }, []);

  return(
    <>
      <PageHeader>Subscribes</PageHeader>
      <Container>
        {subscribes.map((subscribe: any) => (
          <Card key={subscribe.id}>
            <Avatar style={{
              backgroundImage: `url(${API_URL}/images/user/${subscribe})`
            }} />
            <Header>{subscribe}</Header>
          </Card>
        ))}
      </Container>
    </>
  )
}