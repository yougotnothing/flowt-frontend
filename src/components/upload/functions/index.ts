import { Dispatch, SetStateAction } from "react";
import { api } from "../../../api/axiosConfig";
import { NavigateFunction, generatePath } from "react-router-dom";
import { user } from "../../../stores/toUser.mobx";

type SetState<T> = Dispatch<SetStateAction<T>>;
type Function<T, U> = (value: T) => U;

export const postSongAvatar = async (formik: any, avatar?: Blob) => {
  try {
    const avatarData = new FormData();
    avatar && avatarData.append('file', avatar);

    await api.post(`/songs/avatar/${formik.values.songName}`,
      avatarData, {
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('response is ok!');
  }catch(error: any) {
    console.log('response error');
  }
}

export const handleChoseSong = (event: any, setSong: SetState<Blob | undefined>) => {
  const chosenSong = event.target.files[0];
  setSong(chosenSong);
}

export const handleChoseAvatar = (event: any, setAvatar: SetState<Blob | undefined>) => {
  const chosenAvatar = event.target.files[0];
  setAvatar(chosenAvatar);
}

export const postSongInfo = async (formik: any, songGenre: string | null) => {
  try {
    const date = new Date().toLocaleDateString('en-GB');

    await api.post('/songs', {
      name: formik.values.songName,
      issueYear: date,
      genre: songGenre
    });

    console.log('everything is ok!');
  }catch(error: any) {
    console.log('response error:', error);
  }
}

export const postSongAudio = async (formik: any, setIsLoading: SetState<boolean>, song: Blob | undefined, navigate: NavigateFunction) => {
  try {
    const songData = new FormData();
    song && songData.append('file', song);

    if(!songData.get('file')) {
      setIsLoading(false);
      console.log('No file selected');
      return;
    }else if(!song) {
      setIsLoading(false);
      return;
    }

    const response = await api.post(`/songs/audio/${formik.values.songName}`,
      songData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if(response.status === 200) {
      console.log('Response is ok!');
      navigate(generatePath('/account/:id', { id: user.username }));
    }else{
      setIsLoading(false);
      console.log('Unexpected response status:', response.status);
    }
  } catch (error) {
    setIsLoading(false);
    console.error('Response error:', error);
  }
}