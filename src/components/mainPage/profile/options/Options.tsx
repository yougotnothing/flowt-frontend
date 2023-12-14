import React, { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { OptionsContainer, Select, SelectText, CloseOptions } from "./Options.styled";
import { Settings } from "../Profile.styled";
import { OptionsProps } from "./Options.styled";
import { user } from "../../../../stores/toUser.mobx";

export const Options: React.FC<OptionsProps> = ({ $isVisible: prop }) => {
  const[isVisible, setIsVisible] = useState<boolean>(prop);
  const[isOpen, setIsOpen] = useState(prop);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(!isVisible);
  }, [isVisible, isOpen]);

  return (
    <>
      <OptionsContainer $isVisible={isVisible}>
        <CloseOptions onClick={() => setIsVisible(false)} />
        <Select onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
          <SelectText>Account</SelectText>
        </Select>
        <Select onClick={() => navigate(generatePath('/:id/songs/liked', { id: user.username }))}>
          <SelectText>Liked songs</SelectText>
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
        {user.username === 'admin' && (
          <Select onClick={() => navigate('/admin')}>
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
      {!isVisible ? <Settings $isVisible={isOpen} onClick={() => setIsVisible(true)} /> : null}
    </>
  )
}