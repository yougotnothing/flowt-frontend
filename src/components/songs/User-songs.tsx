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

export const UserSongs = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLikeSong = async (song: ISongData | null) => {
    if(!isLiked) {
      likedSongs.likeSong(song);
      setIsLiked(true);
    }else{
      likedSongs.dislikeSong(song);
      setIsLiked(false);
    }
  }

  const handleDeleteSong = async (name: string, index: number) => {
    try {
      await api.delete(`/songs/${name}`);

      runInAction(() => {
        delete songs.userSongs[index];
      });
    }catch(error: any) {
      console.error(error);
      return;
    }
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
          {searchUsersStore.username === user.username && <Droplist onClick={() => setIsOpen(!isOpen)} />}
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
            <DroplistButton $isOpen={isOpen} onClick={() => handleDeleteSong(song.name, index)}>Delete song</DroplistButton>
          )}
        </Song>
      ))}
    </Container>
  )
});