import { api } from "../../../api/axiosConfig";
import { IUserSearch } from "../../../types/props";

type IUser = IUserSearch | null;
type ISetUser = (value: React.SetStateAction<IUser>) => IUser;

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

export const getUser = async(username: string, setUser: ISetUser) => {
  try {
    const response = await api.get(`/admin/user/${username}`);
    setUser(response.data);
    console.log(response.data);
  }catch(error: any) {
    console.error(error);
  }
}