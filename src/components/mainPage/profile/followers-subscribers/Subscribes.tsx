import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../../../../api/axiosConfig";
import { Container, Avatar, Card, Header, PageHeader } from "./Followers.styled";
import { URLS } from "../../../../constants/urls.const";
import { useUserContext } from "../../../../contexts/UserContext";

export const Subscribers: React.FC = () => {
  const navigate = useNavigate();
  let counter: number = 0;
  const url = new URLS();
  const { subscribes } = useUserContext();

  return(
    <Container>
      <PageHeader>Subscribes</PageHeader>
      {subscribes.map((subscribe: any) => (
        <Card key={++counter}>
          <Avatar style={{backgroundImage: `url(${API_URL}/images/user/${subscribe})`}} />
          <Header>{subscribe}</Header>
        </Card>
      ))}
    </Container>
  )
}