import { observer } from "mobx-react-lite";
import { ButtonsWrapper, Container, Droplist, DroplistButton, LikeButton, Song, SongAvatar, SongButton, SongDataWrapper, SongInfo, SongInfoContainer } from "./browse-songs/Songs.styled";
import { useEffect, useState } from "react";
import { userSongsStore as songs } from "../../stores/toSongs.mobx";
import { user } from "../../stores/toUser.mobx";
import { likedSongs } from "../../stores/toLiked-songs.mobx";
import { ISongData } from "../../types/types";
import { searchUsersStore } from "../../stores/toSearchUsers.mobx";
import { Header } from "../mainPage/playlist/large/Playlist.styled";
import { modalStore } from "../../stores/toModal.mobx";

export const UserSongs = observer(() => {
  const [isLikedArr, setIsLikedArr] = useState<boolean[]>(Array(likedSongs.songs.length).fill(false));
  const [isOpen, setIsOpen] = useState<boolean[]>(Array(songs.userSongs.length).fill(false));

  const handleLikeSong = async (song: ISongData, index: number) => {
    if(!isLikedArr[index]) {
      await likedSongs.like(song);
    }else{
      await likedSongs.dislike(song);
    }
  }
  
  const handleSetIsOpen = (index: number) => {
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  const handleDeleteSong = (name: string) => {
    modalStore.setDeleteSong_name(name)
    modalStore.setIsOpen(true, 'delete song');
  }

  useEffect(() => {
    songs.getSongs(searchUsersStore.username);
    likedSongs.setSongs();
  }, []);

  useEffect(() => {
    setIsLikedArr(() => {
      return songs.userSongs.map(existingSong =>
        likedSongs.songs.some(song => song.songId === existingSong.songId)
      );
    });
  }, [likedSongs.songs]);
  

  return (
    <Container>
      <Header>{searchUsersStore.username} songs:</Header>
      {songs.userSongs.map((song, index) => (
        <Song key={index}>
          {searchUsersStore.username === user.username && <Droplist onClick={() => handleSetIsOpen(index)} />}
          <SongDataWrapper>
            <SongAvatar $src={song} />
            <SongInfoContainer>
              <SongInfo $type="name">{song.name}</SongInfo>
              <SongInfo $type="else">{song.author}</SongInfo>
            </SongInfoContainer>
          </SongDataWrapper>
          <ButtonsWrapper>
            <LikeButton disabled={song.author === user.username} $isLiked={isLikedArr[index]} onClick={() => handleLikeSong(song, index)} />
            <SongButton onClick={() => songs.setSong(index, songs.userSongs)}>Listen</SongButton>
          </ButtonsWrapper>
          {searchUsersStore.username === user.username && (
            <DroplistButton $isOpen={isOpen[index]} onClick={() => handleDeleteSong(song.name)}>Delete song</DroplistButton>
          )}
        </Song>
      ))}
    </Container>
  )
});