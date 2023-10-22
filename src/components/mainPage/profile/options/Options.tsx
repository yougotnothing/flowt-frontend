import React, { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { OptionsContainer, Select, SelectText, CloseOptions } from "./Options.styled";
import { Settings } from "../Profile.styled";
import { OptionsProps } from "./Options.styled";
import { useUserContext } from "../../../../contexts/UserContext";

export const Options: React.FC<OptionsProps> = ({ $isVisible: prop }) => {
  const[isVisible, setIsVisible] = useState<boolean>(prop);
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <>
      {isVisible ? (
        <OptionsContainer $isVisible={isVisible}>
          <CloseOptions onClick={() => setIsVisible(false)} />
          <Select onClick={() => navigate(generatePath('/account/:id', {id: user.username}))}>
            <SelectText>Account</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/songs/liked', {id: user.username}))}>
            <SelectText>Liked</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/playlists', {id: user.username}))}>
            <SelectText>Playlists</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/:id/songs/upload', {id: user.username}))}>
            <SelectText>Upload</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/account/:id/settings', {id: user.username}))}>
            <SelectText>Settings</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/notifications/:id', {id: user.username}))}>
            <SelectText>Notifications</SelectText>
          </Select>
          <Select onClick={() => {
            localStorage.removeItem('token');
            navigate('/home');
            window.location.reload();
          }}>
            <SelectText>Logout</SelectText>
          </Select>
        </OptionsContainer>
      ) : (
        <Settings onClick={() => setIsVisible(true)} />
      )}
    </>
  )
}