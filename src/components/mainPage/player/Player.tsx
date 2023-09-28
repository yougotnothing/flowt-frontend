import React, { useEffect, useState } from "react";

import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  PlayerContainer,
  SongContainer,
  SongTitle,
  SongPicture,
  SongCreatorLink,
  SongInfoContainer,
} from "./Player.styled";
import 'react-h5-audio-player/lib/styles.css';
import { api, API_URL } from "../../../api/axiosConfig";
import { useUserContext } from "../../../contexts/UserContext";
import { useSongContext } from "../../../contexts/SongContext";

export const Player: React.FC = () => {
  const { songURL, songName } = useSongContext();
  const { user } = useUserContext();
  const[track, setTrack] = useState<string[]>([]);
  const[trackIndex, setTrackIndex] = useState<number>(0);

  const getSongs = async (): Promise<void> => {
    try {
      const response = await api.get('/users/songs');
      const tracks = response.data.songs;
      setTrack(tracks);
    }catch (error: any) {
      console.log('an error occurred');
    }
  }

  const playNextTrack = () => {
    if(trackIndex < track.length) {
      setTrackIndex(trackIndex + 1);
    }else{
      setTrackIndex(0);
    }
  }

  const playPrevTrack = () => {
    if(trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    }else{
      setTrackIndex(track.length - 1);
    }
  }

  useEffect(() => {
    getSongs();
  }, [songURL]);

  return (
    <>
      {user && songURL && (
        <PlayerContainer>
          <H5AudioPlayer
            layout='stacked-reverse'
            onClickNext={() => playNextTrack()}
            onClickPrevious={() => playPrevTrack()}
            onEnded={() => playNextTrack()}
            autoPlay={true}
            volume={1}
            src={songURL}
            customControlsSection={[
              <SongContainer>
                <SongPicture style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${songName}`}} />
                <SongInfoContainer>
                  <SongCreatorLink>{user.username}</SongCreatorLink>
                  <SongTitle>{songName}</SongTitle>
                </SongInfoContainer>
              </SongContainer>,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS
            ]}
          />
        </PlayerContainer>
      )}
    </>
  );
};