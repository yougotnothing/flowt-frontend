import { observer } from "mobx-react-lite";
import { ButtonsWrapper, Container, Droplist, DroplistButton, LikeButton, Song, SongAvatar, SongButton, SongDataWrapper, SongInfo, SongInfoContainer } from "./browse-songs/Songs.styled";
import { useEffect, useState } from "react";
import { userSongsStore as songs } from "../../stores/toSongs.mobx";
import { user } from "../../stores/toUser.mobx";
import { likedSongs } from "../../stores/toLiked-songs.mobx";
import { ISongData } from "../../types/types";
import { searchUsersStore } from "../../stores/toSearchUsers.mobx";
import { Header } from "../mainPage/playlist/large/Playlist.styled";
import { api } from "../../api/axiosConfig";
import { runInAction } from "mobx";
import { modalStore } from "../../stores/toModal.mobx";

export const UserSongs = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean[]>(Array(songs.userSongs.length).fill(false));

  const handleLikeSong = async (song: ISongData | null) => {
    if(!isLiked) {
      likedSongs.likeSong(song);
      setIsLiked(true);
    }else{
      likedSongs.dislikeSong(song);
      setIsLiked(false);
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

    setIsLiked(
      likedSongs.songs.some(existingSong => 
        songs.userSongs.some(song => 
          song.songId === existingSong.songId
        )
      )
    );
  }, []);

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
            <LikeButton disabled={song.author === user.username} $isLiked={isLiked} onClick={() => handleLikeSong(song)} />
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