import { useState, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { Container, Header, NavButton, Navbar, Stats, StatsContainer } from "./Artist-statistic.styled";
import { artistStatistic } from "../../../../stores/toArtist-statistic.mobx";
import { Title } from "../../../../helmet";

export const ArtistStatistic = observer(() => {
  const [type, setType] = useState<boolean>(true);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    artistStatistic.getOverall(setText);
  }, []);

  const handleSetStatistic = async (type: 'overall' | 'popular'): Promise<string | void> => {
    switch(type) {
      case "overall":
        await artistStatistic.getOverall(setText);
        setType(true);
        break;
      case "popular":
        await artistStatistic.getPopular();
        setType(false);
        break;
    }
  } 

  return (
    <Container>
      <Title title="Artist statistic" />
      <Header>Artist statistic</Header>
      <Navbar>
        <NavButton
          $isPrimary={type}
          disabled={type}
          onClick={() => handleSetStatistic('overall')}
        >Overall</NavButton>
        <NavButton
          $isPrimary={!type}
          disabled={!type}
          onClick={() => handleSetStatistic('popular')}
        >Popular</NavButton>
      </Navbar>
      {artistStatistic.overall ? (
        <StatsContainer>
          <Stats $type="header">Listens: <Stats $type="content">{artistStatistic.overall.listens}</Stats></Stats>
          <Stats $type="header">Listeners: <Stats $type="content">{artistStatistic.overall.listeners}</Stats></Stats>
          <Stats $type="header">Songs count: <Stats $type="content">{artistStatistic.overall.songCount}</Stats></Stats>
        </StatsContainer>
      ) : artistStatistic.popular ? (
        <StatsContainer>
          <Stats $type="header">Listens: <Stats $type="content">{artistStatistic.popular.listens}</Stats></Stats>
          <Stats $type="header">Listeners: <Stats $type="content">{artistStatistic.popular.listeners}</Stats></Stats>
          <Stats $type="header">Songs count: <Stats $type="content">{artistStatistic.popular.songCount}</Stats></Stats>
        </StatsContainer>
      ) : (
        <Stats $type="content">{text}</Stats>
      )}
    </Container>
  );
});