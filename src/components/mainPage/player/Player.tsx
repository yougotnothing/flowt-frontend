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
  SongInfoDataWrapper,
} from "./Player.styled";
import "react-h5-audio-player/lib/styles.css";
import { userSongsStore as song } from "../../../stores/toSongs.mobx";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as Helmet } from "../../../helmet";

export const Player: React.FC = observer(() => {
  const[index, setIndex] = useState<number>(0);
  const[isShuffled, setIsShuffled] = useState<boolean>(false);
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const SHUFFLE_ICON = isShuffled ? "url(/shuffle-on.webp)" : "url(/shuffle-off.webp)";

  const handleLikedSong = async () => {
    try {
      if(!isLiked) {
        await likedSongs.likeSong(null, { author: song.author, name: song.name });
      }else{
        await likedSongs.dislikeSong(null, { author: song.author, name: song.name });
      }
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  const handlePlayNext = useCallback(() => {
    if(isShuffled) {
      setIndex((prevIndex) => {
        let randomIndex: number;
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
    setIsLiked(likedSongs.songs.some(existingSong => existingSong.songId === song.id));
  }, [song.id, likedSongs.songs]);
  

  useEffect(() => {
    song.setSong(index);
  }, [index]);

  return (
    <>
      {user && song.url && (
        <PlayerContainer>
          <Helmet title={`Playing: ${song.name}`} />
          <H5AudioPlayer
            layout="stacked-reverse"
            volume={0.5}
            preload="auto"
            loop={song.container.length > 1 ? false : true}
            src={song.url}
            autoPlay={true}
            timeFormat="mm:ss"
            showSkipControls={true}
            showFilledVolume={false}
            showJumpControls={false}
            onChangeCurrentTimeError={() => console.log('error time change')}
            onEnded={handlePlayNext}
            onClickNext={handlePlayNext}
            onClickPrevious={handlePlayPrev}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_LEFT_TIME,
            ]}
            customControlsSection={[
              <SongContainer>
                <SongPicture style={{ backgroundImage: `url(${song.avatar})` }}/>
                <SongInfoContainer>
                  <SongInfoDataWrapper>
                    <SongCreatorLink>{song.author}</SongCreatorLink>
                  </SongInfoDataWrapper>
                  <SongInfoDataWrapper>
                    <SongTitle>{song.name}</SongTitle>
                  </SongInfoDataWrapper>
                </SongInfoContainer>
                <LikeButton 
                  $isLiked={isLiked}
                  onClick={handleLikedSong}
                />
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