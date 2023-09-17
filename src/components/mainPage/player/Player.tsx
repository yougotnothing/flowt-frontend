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
import { api, API_URL, getUser } from "../../../api/axiosConfig";
import { useContextValues } from "../../../contexts/Context";

export const Player: React.FC = () => {
  const { songURL, songName, user } = useContextValues();

  const getSongs = async () => {
    try {
      const response = await api.get('/users/songs');
    } catch (error: any) {
      console.log('an error occurred');
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
            onPlay={() => console.log('on play')}
            autoPlay={true}
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