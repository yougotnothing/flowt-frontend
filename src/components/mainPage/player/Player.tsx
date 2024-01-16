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
  LikeButton,
} from "./Player.styled";
import "react-h5-audio-player/lib/styles.css";
import { userSongsStore as song } from "../../../stores/toSongs.mobx";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";

export const Player: React.FC = observer(() => {
  const[index, setIndex] = useState<number>(0);
  const[isShuffled, setIsShuffled] = useState<boolean>(false);
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const SHUFFLE_ICON = isShuffled ? "url(/shuffle-on.webp)" : "url(/shuffle-off.webp)";

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
    for(let index = 0; index < likedSongs.songs.length; index++) {
      const likedSongElement = likedSongs.songs[index];

      if(likedSongElement.author === song.author && likedSongElement.name === song.name) {
        setIsLiked(true);
      }
    }
  }, [song.author, song.name, likedSongs.songs]);

  useEffect(() => {
    song.setSong(index);
  }, [index]);

  return (
    <>
      {user && song.url && (
        <PlayerContainer>
          <H5AudioPlayer
            layout="stacked-reverse"
            volume={0.5}
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
                <SongPicture style={{ backgroundImage: `url(${song.avatar})` }}/>
                <SongInfoContainer>
                  <div>
                    <SongCreatorLink>{song.author}</SongCreatorLink>
                  </div>
                  <SongTitle>{song.name}</SongTitle>
                </SongInfoContainer>
                <LikeButton $isLiked={isLiked} />
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