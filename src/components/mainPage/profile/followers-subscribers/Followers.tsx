import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../../../../api/axiosConfig";

import { 
  Avatar,
  Card,
  Container
} from "./Followers.styled";
import { URLS } from "../../../../constants/urls.const";
import { useUserContext } from "../../../../contexts/UserContext";
import { observer } from "mobx-react-lite";

export const Followers: React.FC = observer(() => {
  const navigate = useNavigate();
  let counter: number = 0;
  const url = new URLS();
  const { followers } = useUserContext();

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
});