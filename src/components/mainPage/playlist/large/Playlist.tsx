import { FC, useCallback, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  PlaylistInfo,
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistIcon,
  ContentContainer,
  Header,
  PlaylistDataContainer,
  PlaylistSongsWrapper,
  PlaylistSong,
  PlaylistSongImage,
  PlaylistSongInfoWrapper,
  PlaylistSongInfo,
  PlaylistMainInfoWrapper,
  LikeSongButton
} from "./Playlist.styled";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { user } from "../../../../stores/toUser.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { Title as Helmet } from "../../../../helmet";
import { formatNumbers } from "../../functions";
import { likedSongs } from "../../../../stores/toLiked-songs.mobx";
import { ISongData } from "../../../../types/types";

export const Playlist: FC = observer(() => {
  const [isLikedSongs, setIsLikedSongs] = useState<boolean[]>(Array(playlists.container?.songs.length).fill(false));

  const handleLikedSong = async (song: ISongData) => {
    try {
      const isLikedSong = likedSongs.songs.some(existingSong => existingSong.songId === song.songId);

      if(!isLikedSong) {
        await likedSongs.likeSong(song);
      }else{
        await likedSongs.dislikeSong(song);
      }
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  useEffect(() => {
    const updatedLikedSongs = playlists.container?.songs.map(song =>
      likedSongs.songs.some(likedSong => likedSong.songId === song.songId)
    );
  
    updatedLikedSongs && setIsLikedSongs(updatedLikedSongs);
  }, [likedSongs.songs]);
  

  return (
    <ContentContainer>
      <Helmet title={`Playlist: ${playlists.container?.name}`} />
      <Header>Playlist: </Header>
      {playlists.container && (
        <>
          <Container $isEditing>
            <PlaylistIcon
              $username={playlists.container.username}
              $name={playlists.container.name}
              />
            <PlaylistInfoContainer>
              <PlaylistInfo $type="name">{playlists.container.name}</PlaylistInfo>
              <PlaylistInfo $type="username">{user.username}</PlaylistInfo>
            </PlaylistInfoContainer>
            <PlaylistButton onClick={() => songs.setSong(0, playlists.container?.songs)}>listen</PlaylistButton>
          </Container>
          <PlaylistSongsWrapper>
            {playlists.container.songs.map((song, index) => (
              <PlaylistSong key={index}>
                <PlaylistMainInfoWrapper>
                  <PlaylistSongImage $song={song} />
                  <PlaylistSongInfoWrapper>
                    <PlaylistSongInfo $name>{song.name}</PlaylistSongInfo>
                    <PlaylistSongInfo $author>{song.author}</PlaylistSongInfo>
                  </PlaylistSongInfoWrapper>
                </PlaylistMainInfoWrapper>
                <PlaylistSongInfo $likes>genre: {song.genre}</PlaylistSongInfo>
                <PlaylistSongInfo $likes>listens: {formatNumbers(song.listens.toString())}</PlaylistSongInfo>
                <PlaylistSongInfo $likes>likes: {formatNumbers(song.likes.toString())}</PlaylistSongInfo>
                <LikeSongButton
                  $isLiked={isLikedSongs[index]}
                  onClick={() => handleLikedSong(song)}
                />
              </PlaylistSong>
            ))}
          </PlaylistSongsWrapper>
        </>
      )}
    </ContentContainer>
  );
});