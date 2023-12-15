import { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  GetUserInputContainer,
  AdminPanel,
  GetUserInput,
  GetUserInputButton,
  Droplist,
  DroplistItem,
  DroplistAvatar,
  DroplistItemButton,
  DroplistItemInfo,
  DroplistItemInfoContainer,
  Menu,
  MenuItem,
  Message,
  DroplistContainer,
  GetUserContainer,
  GetUserAvatar,
  GetUserData,
  GetUserDataContainer,
  GetUserMainInfoContainer
} from "./Admin.styled";
import { addModerator, getUser, deleteUser } from "./functions";
import { adminStore as admin } from "../../stores/toAdmin.mobx";
import { IUserSearch } from "../../types/props";

export const Admin: FC = observer(() => {
  const [isUserChosen, setIsUserChosen] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<IUserSearch | null>(null);

  const handleSearch = async (e: any) => {
    if(e.target.value) {
      admin.setInput(e.target.value.trim());
      await admin.getUsers();
    }else if(!e.target.value) {
      admin.setUsers(null);
      admin.setMessage('');
    }
  }

  useEffect(() => {
    if(admin.input.length === 0) {
      admin.setUsers(null);
    }
  }, [admin.input]);

  return (
    <Container>
      <AdminPanel></AdminPanel>
      <DroplistContainer>
        <GetUserInputContainer>
          <GetUserInput placeholder="search user" 
            onChange={async (e: any) => handleSearch(e)} />
          <GetUserInputButton />
        </GetUserInputContainer>
        <Droplist>
          {admin.users && admin.users.map((user, index) => (
            <DroplistItem key={index}>
              <DroplistAvatar src={user.userHaveAvatar ? user.avatar : '/defalutAvatar.png'} />
              <DroplistItemInfoContainer>
                <DroplistItemInfo>
                  {user.username}
                </DroplistItemInfo>
              </DroplistItemInfoContainer>
              <DroplistItemButton onClick={() => {
                getUser(user.username, setSearchUser);
                setIsUserChosen(true);
              }}>actions</DroplistItemButton>
            </DroplistItem>
          ))}
          {admin.message && <Message>{admin.message}</Message>}
        </Droplist>
      </DroplistContainer>
      {isUserChosen && searchUser && (
        <GetUserContainer>
          <GetUserMainInfoContainer>
            <GetUserAvatar src={searchUser.userHaveAvatar ? searchUser.avatar : '/defaultAvatar.png'} />
              <GetUserDataContainer>
              <GetUserData $type="username">
                {searchUser.username}
              </GetUserData>
              <GetUserData $type="else">
                {searchUser.region}
              </GetUserData>
            </GetUserDataContainer>
          </GetUserMainInfoContainer>
          <Menu>
            <MenuItem onClick={async () => await deleteUser(searchUser.username)}>Delete user</MenuItem>
            <MenuItem onClick={async () => await addModerator(searchUser.username)}>Add moderator</MenuItem>
            <MenuItem></MenuItem>
          </Menu>
        </GetUserContainer>
      )}
    </Container>
  );
});