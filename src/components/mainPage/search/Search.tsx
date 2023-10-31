import React, { useState, useEffect } from "react";

import { api, API_URL } from "../../../api/axiosConfig";
import { generatePath, useNavigate } from "react-router-dom";
import {
  Container,
  ContentContainer,
  FiltersContainer,
  Header,
  SearchFilterButton,
  SearchFilters,
  Card,
  CardIcon,
  CardInfoContainer, CardInfo
} from "./Search.styled";
import { userAvatarStore } from "../../../stores/toChangeAvatar";
import filters from "../../../json/filters.json";
import { searchStore as search } from "../../../stores/toSearch";
import { useUserContext } from "../../../contexts/UserContext";
import { observer } from "mobx-react-lite";

export const Search: React.FC = observer(() => {
  const [params, setParams] = useState<string>('All');
  const navigate = useNavigate();
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
        {search.songs.map((song, index) => (
          <Card key={index}>
            <CardIcon
              style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${user.username}/${song.name}`)})`}} />
            <CardInfoContainer>
              <CardInfo>{user.username}</CardInfo>
              <CardInfo>{song.name}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
        {search.users.map((searchUser, index) => (
          <Card key={index}>
            <CardIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}}/>
            <CardInfoContainer>
              <CardInfo>{searchUser.username}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
        {search.playlists.map((playlist, index) => (
          <Card key={index}>
            <CardIcon />
            <CardInfoContainer>
              <CardInfo>{playlist.name}</CardInfo>
            </CardInfoContainer>
          </Card>
        ))}
      </ContentContainer>
    </Container>
  )
});