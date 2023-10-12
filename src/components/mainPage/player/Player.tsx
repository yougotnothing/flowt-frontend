import React, { useEffect, useState, useCallback } from "react";

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
import { useUserContext } from "../../../contexts/UserContext";
import { userSongsStore as song } from "../../../store/toSongs";
import { observer } from "mobx-react-lite";

export const Player: React.FC = observer(() => {
  const[index, setIndex] = useState(0)
  const { user } = useUserContext();

  const handlePlayNext = useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex < song.container.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  }, [song.container]);

  const handlePlayPrev = useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return song.container.length - 1;
      }
    });
  }, [song.container]);

  useEffect(() => {
    if (user) {
      song.setSong(index, user.username);
    }
  }, [index, user]);

  return (
    <>
      {user && song.url && (
        <PlayerContainer>
          <H5AudioPlayer
            layout='stacked-reverse'
            autoPlay={true}
            volume={1}
            showFilledVolume={false}
            onEnded={handlePlayNext}
            onClickNext={handlePlayNext}
            onClickPrevious={handlePlayPrev}
            showSkipControls={true}
            src={song.url}
            customControlsSection={[
              <SongContainer>
                <SongPicture style={{backgroundImage: `url(${song.avatar})`}} />
                <SongInfoContainer>
                  <SongCreatorLink>{user.username}</SongCreatorLink>
                  <SongTitle>{song.name}</SongTitle>
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
});