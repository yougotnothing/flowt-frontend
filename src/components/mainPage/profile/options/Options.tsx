import { FC, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { OptionsContainer, Select, SelectText, CloseOptions } from "./Options.styled";
import { Settings } from "../Profile.styled";
import { user } from "../../../../stores/toUser.mobx";
import { searchUsersStore as searchUsers } from "../../../../stores/toSearchUsers.mobx";
import { api } from "../../../../api/axiosConfig";
import { reportStore } from "../../../../stores/toReport.mobx";

export const Options: FC<{ isCurrentUser: boolean }> = ({ isCurrentUser }) => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[subscribeButtonText, setSubscribeButtonText] = useState<'follow' | 'unfollow'>('follow');
  const navigate = useNavigate();

  const handleClickSubscribeButton = async () => {
    try {
      if(user && user.username !== searchUsers.username) {
        if(subscribeButtonText === 'follow') {
          await api.post(`/users/subscribe/${searchUsers.username}`);
          
          setSubscribeButtonText('unfollow');
          console.log(`successfully subscribed to ${searchUsers.username}`);
        }else{
          await api.post(`/users/unsubscribe/${searchUsers.username}`);

          setSubscribeButtonText('follow');
          console.log(`succesfully unsubscribe from ${searchUsers.username}`);
        }
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  return (
    <>
      <OptionsContainer $isVisible={isVisible}>
      {isCurrentUser ? (
        <>
          <CloseOptions onClick={() => setIsVisible(false)} />
          <Select onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
            <SelectText>Account</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/profile/:id/songs', { id: user.username }))}>
            <SelectText>Your songs</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/songs/upload', { id: user.username }))}>
            <SelectText>Upload song</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/profile/:id/liked-songs', { id: user.username }))}>
            <SelectText>Liked songs</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/profile/:id/liked-playlists', { id: user.username }))}>
            <SelectText>Liked playlists</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/playlists/create-playlist', { id: user.username }))}>
            <SelectText>Create playlist</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/notifications/:id', { id: user.username }))}>
            <SelectText>Notifications</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/verify-artist/send', { id: user.username }))}>
            <SelectText>Verify artist</SelectText>
          </Select>
          {user.username === 'admin' && (
            <Select onClick={() => navigate('/admin/reports')}>
              <SelectText>Admin panel</SelectText>
            </Select>
          )}
          <Select onClick={() => {
            localStorage.removeItem('token');
            navigate('/home');
            user.logout();
          }}>
            <SelectText>Logout</SelectText>
          </Select>
        </>
        ) : (
          <>
            <CloseOptions onClick={() => setIsVisible(false)} />
            <Select onClick={handleClickSubscribeButton}>
              <SelectText>{subscribeButtonText}</SelectText>
            </Select>
            <Select onClick={() => navigate(generatePath('/profile/:id/songs', { id: searchUsers.username }))}>
              <SelectText>Songs</SelectText>
            </Select>
            <Select onClick={() => navigate(generatePath('/playlists/:id', { id: searchUsers.username }))}>
              <SelectText>Playlists</SelectText>
            </Select>
            <Select onClick={() => reportStore.setIsOpen(true)}>
              <SelectText>Report</SelectText>
            </Select>
          </>
        )}
      </OptionsContainer>
      {!isVisible ? <Settings $isVisible={!isVisible} onClick={() => setIsVisible(true)} /> : null}
    </>
  )
}