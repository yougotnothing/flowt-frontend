import { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api } from "../../../../api/axiosConfig";
import { OptionsContainer, Select, SelectText, CloseOptions } from "./options.styled";
import { Settings } from "../profile.styled";

export const Options: React.FC = () => {
  const[isVisible, setIsVisible] = useState<boolean>(true);
  const[user, setUser] = useState<any>(null);
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
      <OptionsContainer>
        <CloseOptions onClick={() => setIsVisible(false)} />
        <Select>
          <SelectText>theme</SelectText>
        </Select>
        <Select onClick={() => navigate(generatePath('/account/:id', { id: user.username  }))}>
          <SelectText>account</SelectText>
        </Select>
        <Select>
          <SelectText>settings</SelectText>
        </Select>
      </OptionsContainer>
      ) : <Settings onClick={() => setIsVisible(true)} />}
    </>
  )
}