import { FC, useEffect } from "react";

import { Wrapper } from "./Home.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { recommendations } from "../../../stores/toRecommendations.mobx";
import { savedPlaylists } from "../../../stores/toSaved-playlists.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as PageTitle } from "../../../helmet";
import { PlaylistsSongs } from "./components/smallsize";

export const Home: FC = observer(() => {
  useEffect(() => {
    recommendations.getRecommendationList();
    recommendations.getMustLikeList();
    user.getLastListened('songs');
    user.getLastListened('playlists');
    savedPlaylists.getSaved();
    likedSongs.setSongs();
  }, []);

  return (
    <Wrapper>
      <PageTitle title="Home" />
      <PlaylistsSongs size="big" />
      <PlaylistsSongs size="small" />
    </Wrapper>
  );
});