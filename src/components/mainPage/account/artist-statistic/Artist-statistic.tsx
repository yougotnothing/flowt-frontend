import { useState, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { Container, Header, NavButton, Navbar, Stats, StatsContainer } from "./Artist-statistic.styled";
import { artistStatistic } from "../../../../stores/toArtist-statistic.mobx";

export const ArtistStatistic = observer(() => {
  const [type, setType] = useState<boolean>(true);

  useEffect(() => {
    artistStatistic.getOverall();
  }, []);

  const handleSetStatistic = async (type: 'overall' | 'popular'): Promise<string | void> => {
    switch(type) {
      case "overall":
        await artistStatistic.getOverall();
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
      <Header>Artist statistic</Header>
      <Navbar>
        <NavButton
          $isPrimary={type}
          disabled={type}
          onClick={() => handleSetStatistic('overall')}>Overall</NavButton>
        <NavButton
          $isPrimary={!type}
          disabled={!type}
          onClick={() => handleSetStatistic('popular')}>Popular</NavButton>
      </Navbar>
      {artistStatistic.overall && (
        <StatsContainer>
          <Stats $type="header">Listens: <Stats $type="content">{artistStatistic.overall.listens}</Stats></Stats>
          <Stats $type="header">Listeners: <Stats $type="content">{artistStatistic.overall.listeners}</Stats></Stats>
          <Stats $type="header">Songs count: <Stats $type="content">{artistStatistic.overall.songCount}</Stats></Stats>
        </StatsContainer>
      )}
    </Container>
  );
});