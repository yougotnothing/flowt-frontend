import { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api } from "../../../api/axiosConfig";
import { AccountContainer, ChangeAvatar } from "./account.styled";

export const Account: React.FC = () => {
  const[user, setUser] = useState<any>('');
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await api.get('/users/authenticated');
    setUser(response.data);
  }

  useEffect(() => { getUser() }, []);

  return (
    <AccountContainer>
      <ChangeAvatar 
        onClick={() => navigate(generatePath('/account/:id/change-avatar', { id: user.username }))}
      >
        Change avatar
      </ChangeAvatar>
    </AccountContainer>
  )
}