import { FC } from "react";

import { API_URL } from "../../../api/axiosConfig";
import {
  Container,
  ContentContainer,
  FiltersContainer,
  Header,
  SearchFilterButton,
  SearchFilters,
  Card,
  CardIcon,
  CardInfoContainer,
  CardInfo
} from "./Search.styled";
import { userAvatarStore } from "../../../stores/toChangeAvatar.mobx";
import filters from "../../../json/filters.json";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { useUserContext } from "../../../contexts/UserContext";
import { observer } from "mobx-react-lite";

export const Search: FC = observer(() => {
  const { user } = useUserContext();

  return (
    <Container>
      <Header>Search</Header>
      <FiltersContainer>
        <SearchFilters>
          {filters.map((filter, index) => (
            <SearchFilterButton
              key={index}
              onClick={async () => await search.get(filter)}
            >
              {filter}
            </SearchFilterButton>
          ))}
        </SearchFilters>
      </FiltersContainer>
      <ContentContainer>
        {search.songs && search.songs.map((song, index) => (
          <Card key={index}>
            <CardIcon
              $type='song'
              style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${user.username}/${song.name}`)})`}} />
            <CardInfoContainer>
              <CardInfo>{user.username}</CardInfo>
              <CardInfo>{song.name}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
        {search.users && search.users.map((searchUser, index) => (
          <Card key={index}>
            <CardIcon $type='user' style={{backgroundImage: `url(${userAvatarStore.avatar})`}}/>
            <CardInfoContainer>
              <CardInfo>{searchUser.username}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
        {search.playlists && search.playlists.map((playlist, index) => (
          <Card key={index}>
            <CardIcon $type='song' />
            <CardInfoContainer>
              <CardInfo>{playlist.username}</CardInfo>
              <CardInfo>{playlist.name}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
      </ContentContainer>
    </Container>
  )
});