import { FC, useEffect } from "react";

import { Wrapper } from "./Home.styled";
import { observer } from "mobx-react-lite";
import { user } from "../../../stores/toUser.mobx";
import { recommendations } from "../../../stores/toRecommendations.mobx";
import { savedPlaylists } from "../../../stores/toSaved-playlists.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as PageTitle } from "../../../helmet";
import { PlaylistsSongs } from "./components/smallsize";
import { useLocation, useNavigate } from "react-router-dom";

export const Home: FC = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === '/' && !user.isUserAuthenticated) {
      navigate('/welcome');
    }
  }, [location.pathname]);

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