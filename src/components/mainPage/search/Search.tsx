import React, { useState, useEffect } from "react";

import { api } from "../../../api/axiosConfig";
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
import { userAvatarStore } from "../../../store/toChangeAvatar";
import filters from "../../../json/filters.json";

export const Search: React.FC = () => {
  const [params, setParams] = useState<string>('All');
  const navigate = useNavigate();

  const search = async () => {
    try {
      const response = await api.get(`/search/${params}`);

    }catch(error: any) {
      console.log('an error occurred');
    }
  }

  const searchAll = async () => {
    try {
      await api.get('/search/songs');
      await api.get('/search/users');
      await api.get('/search/playlists');
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {

  }, []);

  return (
    <Container>
      <Header>Search</Header>
      <FiltersContainer>
        <SearchFilters>
          {filters.map((filter, index) => (
            <SearchFilterButton
              key={index}
              onClick={() => {
                setParams(filter);
                params === 'All'
                ? searchAll()
                : search();
              }}
            >
              {filter}
            </SearchFilterButton>
          ))}
        </SearchFilters>
      </FiltersContainer>
      <ContentContainer>
        <Card>
          <CardIcon style={{backgroundImage: userAvatarStore.avatar}} />
          <CardInfoContainer>
            <CardInfo>Test</CardInfo>
            <CardInfo>Test</CardInfo>
          </CardInfoContainer>
        </Card>
      </ContentContainer>
    </Container>
  )
}