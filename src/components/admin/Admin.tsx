import { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  GetUserInputContainer, 
  AdminPanel, 
  GetUserContainer, 
  GetUserInput, 
  GetUserAvatar, 
  GetUserDataContainer, 
  GetUserData, 
  GetUserInputButton,
  Droplist,
  DroplistItem,
  DroplistAvatar,
  DroplistItemButton,
  DroplistItemInfo
} from "./Admin.styled";
import { getUser, deleteUser, addModerator } from "./functions";
import { searchStore as search } from "../../stores/toSearch.mobx";
import React from "react";
import { api } from "../../api/axiosConfig";
import { IUserSearch } from "../../types/props";

export const Admin: FC = observer(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usersArray, setUsersArray] = useState<IUserSearch[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSearchUsers = async () => {
    try {
      const response = await api.post('/search/users', {
        substring: input
      });

      setUsersArray(response.data.users);
      console.log(response.data.users);
    }catch(error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(input.length === 0 && usersArray.length > 0) {
      setUsersArray([]);
    } 
  }, [input, usersArray]);

  return (
    <Container>
      <AdminPanel></AdminPanel>
      <GetUserInputContainer>
        <GetUserInput placeholder="search user" 
          onChange={(e: any) => {
            handleSearchUsers();
            setInput(e.target.value);
          }} />
        <GetUserInputButton />
      </GetUserInputContainer>
      <Droplist>
        {usersArray.map((user, index) => (
          <DroplistItem key={index}>
            <DroplistAvatar src={user.userHaveAvatar ? user.avatar : '/defalutAvatar.png'} />
            <DroplistItemInfo>
              {user.username}
            </DroplistItemInfo>
            <DroplistItemButton>click</DroplistItemButton>
          </DroplistItem>
        ))}
      </Droplist>
      <GetUserContainer>
      {usersArray.map((user, index) => (
        <React.Fragment key={index}>
          <GetUserAvatar src={(user.userHaveAvatar && user.avatar) || '/defaultAvatar.png'} />
          <GetUserDataContainer>
            <GetUserData $type="username">{user.username}</GetUserData>
          </GetUserDataContainer>
        </React.Fragment>
      ))}
      </GetUserContainer>
    </Container>
  );
});