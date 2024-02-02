import { FC, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { OptionsContainer, Select, SelectText, CloseOptions } from "./Options.styled";
import { Settings } from "../Profile.styled";
import { user } from "../../../../stores/toUser.mobx";

export const Options: FC = () => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <OptionsContainer $isVisible={isVisible}>
        <CloseOptions onClick={() => setIsVisible(false)} />
        <Select onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
          <SelectText>Account</SelectText>
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
        <Select onClick={() => navigate(generatePath('/:id/songs/upload', { id: user.username }))}>
          <SelectText>Upload song</SelectText>
        </Select>
        <Select onClick={() => navigate(generatePath('/account/:id/settings', { id: user.username }))}>
          <SelectText>Settings</SelectText>
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
      </OptionsContainer>
      {!isVisible ? <Settings $isVisible={!isVisible} onClick={() => setIsVisible(true)} /> : null}
    </>
  )
}