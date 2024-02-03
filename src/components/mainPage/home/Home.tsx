import { FC, useEffect } from "react";

import { Wrapper } from "./Home.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { recommendations } from "../../../stores/toRecommendations.mobx";
import { savedPlaylists } from "../../../stores/toSaved-playlists.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as PageTitle } from "../../../helmet";
import { LastListened } from "./components/last-listened/Last-listened";
import { LikedPlaylists } from "./components/liked-playlists/Liked-playlists";
import { Recommendations } from "./components/recommendations/Recommendations";

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
      <LastListened />
      <Recommendations />
      <LikedPlaylists />
    </Wrapper>
  );
});