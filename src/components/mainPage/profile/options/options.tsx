import { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api } from "../../../../api/axiosConfig";
import { OptionsContainer, Select, SelectText, CloseOptions } from "./options.styled";
import { Settings } from "../profile.styled";
import { OptionsProps } from "./options.styled";

export const Options: React.FC<OptionsProps> = ({ $isVisible: prop }) => {
  const[user, setUser] = useState<any>(null);
  const[isVisible, setIsVisible] = useState<boolean>(prop);
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await api.get('/users/authenticated');
    setUser(response.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isVisible ? (
        <OptionsContainer $isVisible={isVisible}>
          <CloseOptions onClick={() => setIsVisible(false)} />
          <Select>
            <SelectText>Theme</SelectText>
          </Select>
          <Select onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
            <SelectText>Account</SelectText>
          </Select>
          <Select>
            <SelectText>Settings</SelectText>
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