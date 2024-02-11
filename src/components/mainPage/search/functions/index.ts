import { api } from "../../../../api/axiosConfig";
import { reportStore } from "../../../../stores/toReport.mobx";
import { generatePath, NavigateFunction } from "react-router-dom";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";
import { IPlaylist, ISearchPlaylist, ISongsSearch, IUserProps, IUserSearch } from "../../../../types/props";
import { Dispatch, SetStateAction } from "react";
import { user as _ } from "../../../../stores/toUser.mobx";

type Set<T> = Dispatch<SetStateAction<T>>;

export const handleClickUserModalButton = (user: IUserSearch) => {
  handleOpenReportModal('USER');
  reportStore.setContentTypeName(user.username);
  reportStore.setWhomName(user.username);
}

export const handleClickPlaylistModalButton = (playlist: IPlaylist | ISearchPlaylist) => {
  handleOpenReportModal('PLAYLIST');
  reportStore.setContentTypeName(playlist.name);
  reportStore.setWhomName(playlist.username);
}

export const handleClickSongModalButton = (song: ISongsSearch) => {
  handleOpenReportModal('SONG');
  reportStore.setContentTypeName(song.name);
  reportStore.setWhomName(song.author);
}

export const handleCardClick = (user: IUserSearch, navigate: NavigateFunction) => {
  searchUsersStore.setUser(user);
  navigate(generatePath('/profile/:id', { id: user.username }));
}

const handleOpenReportModal = (type: 'USER' | 'SONG' | 'PLAYLIST') => {
  reportStore.setIsOpen(true);
  reportStore.setContentTypeArray(type);
}

export const handleSubscribe = async (username: string, isSubscribed: boolean) => {
  try {
    if(!isSubscribed) {
      await api.post(`/users/subscribe/${username}`);
      console.log(`subscribed to user ${username}!`);
    }else{
      await api.post(`/users/unsubscribe/${username}`);
      console.log(`unsubscribed from user ${username}`);
    }
  }catch(error: any) {
    console.error(error.response.data.message);
  }
}

export const handleMouseEnter = (index: number, set: Set<boolean[]>) => {
  set(prevState => {
    const newState = [...prevState];
    newState[index] = true;
    return newState;
  });
};

export const handleMouseLeave = (index: number, set: Set<boolean[]>) => {
  set(prevState => {
    const newState = [...prevState];
    newState[index] = false;
    return newState;
  });
};

export const handleCheckIsSubscribed = (user: IUserSearch, subscribes: IUserProps[]): boolean => {
  for(const subscribe of subscribes) {
    if(subscribe.username === user.username) {
      return true;
    }
  }

  return false;
}