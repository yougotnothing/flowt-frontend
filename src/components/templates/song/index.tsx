import { generatePath, useNavigate } from "react-router-dom";
import { searchStore } from "../../../stores/toSearch.mobx";
import { user } from "../../../stores/toUser.mobx";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { 
  SongButton,
  SongContainer,
  SongData,
  SongImage,
  SongLikedIcon,
  SongListensIcon,
  SongStatsContainer,
  SongTitle,
  Stats,
  StatsTitle
} from "../../songs/smallsizeSongs/Songs.styled";
import { useState } from "react";
import { api } from "../../../api/axiosConfig";
import { observer } from "mobx-react-lite";

export const Song: React.FC<{ song: any, index: number }> = observer(({ song, index }) => {
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLikedSong = async (song_name: string | null, username: string | null, index: number) => {
    try {
      if(!isLiked) {
        await api.post(`/liked/${username}/${song_name}`);
        setIsLiked(true);
      }else{
        await api.delete(`/liked/${username}/${song_name}`);
        setIsLiked(false);
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  return (
    <SongContainer
      key={index} 
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        gap: 20,
        justifyContent: 'initial'
      }}
      onDoubleClick={() => {
        songs.patchSong(song);
        songs.setSong(index);
      }}
    >
      <SongImage $song={song}>
        <SongButton 
          onClick={() => {
            if(user.username) {
              songs.patchSong(song);
              songs.setSong(index);
            }
          }}
        />
      </SongImage>
      <SongData>
        <SongTitle
          onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}
        >
          {song.author}
        </SongTitle>
        <SongTitle
          onClick={() => {
            searchStore.setSong(song);
            navigate(generatePath('/song/:id', { id: song.name }));
          }}
        >
          {song.name}
        </SongTitle>
        <SongStatsContainer>
          <Stats>
            <SongListensIcon />
            <StatsTitle>{song.listens}</StatsTitle>
          </Stats>
          <Stats>
            <SongLikedIcon />
            <StatsTitle>{song.likes}</StatsTitle>
          </Stats>
        </SongStatsContainer>
      </SongData>
    </SongContainer>
  );
});