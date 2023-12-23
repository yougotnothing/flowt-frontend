import { api } from "../../../api/axiosConfig";
import { IUserSearchAsAdmin } from "../../../types/props";
import { NavigateFunction, generatePath } from "react-router-dom";
import { adminStore as admin } from "../../../stores/toAdmin.mobx";

type ISetUser = React.Dispatch<React.SetStateAction<IUserSearchAsAdmin | null>>;
type ISetIsOpen = React.Dispatch<React.SetStateAction<boolean[]>>;

export const addModerator = async (username: string) => {
  try {
    await api.patch(`/admin/user/${username}`);
    console.log('user successfully added to moderators list!');
  }catch(error: any) {
    console.error(error);
  }
}

export const deleteUser = async (username: string) => {
  try {
    await api.delete(`/admin/user/${username}`);
    console.log('user successfully delete');
  }catch(error: any) {
    console.error(error);
  }
}

export const getReports = async (type: string) => {
  try {
    const response = await api.get(`/reports/${type}`);
    console.log(`reports: ${response.data.reports}`);
  }catch(error: any) {
    console.error(error);
  }
}

export const getUser = async (username: string, setUser: ISetUser) => {
  try {
    const response = await api.get(`/admin/user/${username}`);
    setUser(response.data);
    console.log(response.data);
  }catch(error: any) {
    console.error(error);
  }
}

export const getMail = async () => {

}

export const sendWarningMail = async (username: string | null) => {
  try {
    await api.post(`/moderator/warning-mail/${username}`);
    console.log('mail successfully send');
  }catch(error: any) {
    console.log(error);
  }
}

export const changeUserActive = async (username: string | null) => {
  try {
    await api.patch(`/moderator/active/${username}`);
    console.log('user active successfully changed');
  }catch(error: any) {
    console.error(error);
  }
}

export const handleNavigateToReportContent = (param: string, navigate: NavigateFunction) => {
  switch(admin.type) {
    case "USER":
      navigate(generatePath('/profile/:id', { id: param }));
      break;
    case "PLAYLIST":
      navigate(generatePath('/playlist/:id', { id: param }));
      break;
    case "SONG":
      navigate(generatePath('/songs/:id', { id: param }));
      break;
  }
}

export const handleMouseEnter = (index: number, setIsOpen: ISetIsOpen) => {
  setIsOpen(prevState => {
    const newState = [...prevState];
    newState[index] = true;
    return newState;
  });
}

export const handleMouseLeave = (index: number, setIsOpen: ISetIsOpen) => {
  setIsOpen(prevState => {
    const newState = [...prevState];
    newState[index] = false;
    return newState;
  });
};

export const handleSearch = async (e: any) => {
  if(e.target.value) {
    admin.setInput(e.target.value.trim());
    await admin.getUsers();
  }else if(!e.target.value) {
    admin.setUsers(null);
    admin.setMessage('');
  }
}

export const reportButtonText =  admin.type === 'USER' ? 'Go to user profile' : admin.type === 'SONG' ? 'Go to song' : 'Go to playlist';