import {
  DroplistContainer, 
  GetUserInputContainer, 
  GetUserInput, 
  GetUserInputButton, 
  Droplist, 
  DroplistItem,
  DroplistAvatar, 
  DroplistItemInfoContainer, 
  DroplistItemInfo, 
  DroplistItemButton, 
  Message, 
  GetUserAvatar, 
  GetUserContainer, 
  GetUserData, 
  GetUserDataContainer, 
  GetUserMainInfoContainer, 
  Menu, 
  MenuItem,
  UserInfoContainer,
  UserInfo,
  UserInfoSpan,
  UserInfoDescriptionContainer,
  Header
} from "./Admin.styled";
import { handleSearch, getUser, addModerator, deleteUser } from "./functions";
import { adminStore as admin } from "../../stores/toAdmin.mobx";
import { useEffect, useRef, useState } from "react";
import { IUserSearchAsAdmin } from "../../types/props";
import { observer } from "mobx-react-lite";

export const Users = observer(() => {
  const [isUserChosen, setIsUserChosen] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<IUserSearchAsAdmin | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: any) => {
    if(ref.current && !ref.current.contains(e.target)) {
      admin.setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if(admin.input.length === 0) {
      admin.setUsers(null);
      admin.setIsOpen(false);
    }else if(admin.input.length > 0) {
      admin.setIsOpen(true);
    }

    console.log(admin.input.length);
  }, [admin.input]);

  return (
    <>
    <DroplistContainer>
        <GetUserInputContainer>
          <GetUserInput placeholder="search user" 
            onChange={async (e: any) => handleSearch(e)} />
          <GetUserInputButton />
        </GetUserInputContainer>
        <Droplist $isOpen={admin.isOpen} ref={ref}>
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
                admin.setIsOpen(false);
              }}>actions</DroplistItemButton>
            </DroplistItem>
          ))}
          {admin.message && <Message>{admin.message}</Message>}
        </Droplist>
      </DroplistContainer>
      {isUserChosen && searchUser && (
        <>
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
        <Header>User info:</Header>
        <UserInfoContainer>
          <UserInfo><UserInfoSpan>username:</UserInfoSpan> {searchUser.username}</UserInfo>
          <UserInfo><UserInfoSpan>email:</UserInfoSpan> {searchUser.email}</UserInfo>
          <UserInfo><UserInfoSpan>region:</UserInfoSpan> {searchUser.region}</UserInfo>
          <UserInfo><UserInfoSpan>roles:</UserInfoSpan> {searchUser.roles.map(role => role.toLowerCase())}</UserInfo>
          <UserInfo><UserInfoSpan>description:</UserInfoSpan> {!searchUser.description && "user have no description"}</UserInfo>
          {searchUser.description && (
            <UserInfoDescriptionContainer>
              <UserInfo>{searchUser.description}</UserInfo>
            </UserInfoDescriptionContainer>
          )}
        </UserInfoContainer>
        </>
      )}
    </>
  )
});