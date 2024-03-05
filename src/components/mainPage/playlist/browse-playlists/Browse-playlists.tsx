import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Wrapper, Text, CardsWrapper, Card, CardIcon } from "./Browse-playlists.styled";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";
import { Title } from "../../../../helmet";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { playlistsStore } from "../../../../stores/toPlaylists.mobx";

export const BrowsePlaylists: FC = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    searchUsersStore.getPlaylists(location.pathname.split('/')[2]);
  }, []);

  return (
    <Wrapper>
      <Title title={`${searchUsersStore.username} playlists`} />
      <Text $text_weight="bold" $text_type="paragraf">{searchUsersStore.username} playlists</Text>
      <CardsWrapper>
        {searchUsersStore.playlists.map((playlist, index) => (
          <Card onClick={() => {
            playlistsStore.getPlaylist(playlist);
            navigate(generatePath('/playlist/:id', { id: playlist.name }));
          }} key={index}>
            <CardIcon $icon_url={playlist} />
            <Text
              $text_weight="bold"
              $text_type="header"
              onClick={() => navigate(generatePath('/playlist/:author/:id', { author: playlist.username, id: playlist.name }))}
            >{playlist.name}</Text>
            <Text
              $text_weight="thin"
              $text_type="header"
              onClick={() => navigate(generatePath('/profile/:id', { id: playlist.username }))}
            >{playlist.username}</Text>
          </Card>
        ))}
      </CardsWrapper>
    </Wrapper>
  )
});