import React, { useEffect, useState, useCallback } from "react";

import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  PlayerContainer,
  SongContainer,
  SongTitle,
  SongPicture,
  SongCreatorLink,
  SongInfoContainer,
  ShuffleButton,
} from "./Player.styled";
import "react-h5-audio-player/lib/styles.css";
import { useUserContext } from "../../../contexts/UserContext";
import { userSongsStore as song } from "../../../store/toSongs";
import { observer } from "mobx-react-lite";

export const Player: React.FC = observer(() => {
  const [index, setIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const SHUFFLE_ICON = isShuffled ? "url(/shuffle-on.webp)" : "url(/shuffle-off.webp)";
  const { user } = useUserContext();

  const handlePlayNext = useCallback(() => {
    if(isShuffled) {
      setIndex((prevIndex) => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * song.container.length);
        }while(prevIndex === randomIndex);
          return randomIndex;
      });
    }else{
      setIndex((prevIndex) => {
        if(prevIndex < song.container.length - 1) {
          return prevIndex + 1;
        }else{
          return 0;
        }
      });
    }
  }, [isShuffled]);

  const handleShuffleClick = () => {
    setIsShuffled(!isShuffled);
    console.log(isShuffled);
  };

  const handlePlayPrev = useCallback(() => {
    if(isShuffled) {
      setIndex((prevIndex) => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * song.container.length);
        }while(prevIndex === randomIndex);
        return randomIndex;
      });
    }else{
      setIndex((prevIndex) => {
        if(prevIndex > 0) {
          return prevIndex - 1;
        }else{
          return song.container.length - 1;
        }
      });
    }
  }, [isShuffled]);

  useEffect(() => {
    if(user) {
      song.setSong(index, user.username);
    }
  }, [index, user]);

  return (
    <>
      {user && song.url && (
        <PlayerContainer>
          <H5AudioPlayer
            layout="stacked-reverse"
            volume={1}
            src={song.url}
            autoPlay={true}
            showSkipControls={true}
            showFilledVolume={false}
            showJumpControls={false}
            onEnded={handlePlayNext}
            onClickNext={handlePlayNext}
            onClickPrevious={handlePlayPrev}
            customControlsSection={[
              <SongContainer>
                <SongPicture
                  style={{ backgroundImage: `url(${song.avatar})` }}
                />
                <SongInfoContainer>
                  <SongCreatorLink>{user.username}</SongCreatorLink>
                  <SongTitle>{song.name}</SongTitle>
                </SongInfoContainer>
              </SongContainer>,
              <ShuffleButton
                style={{ backgroundImage: SHUFFLE_ICON }}
                onClick={handleShuffleClick}
              />,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
          />
        </PlayerContainer>
      )}
    </>
  );
});
