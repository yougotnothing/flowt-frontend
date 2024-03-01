import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Wrapper, Text, CardsWrapper, Card, CardIcon } from "./Browse-playlists.styled";

export const BrowsePlaylists: FC = observer(() => {
  return (
    <Wrapper>
      <Text $text_weight="bold" $text_type="paragraf"></Text>
      <CardsWrapper>
        <Card>
          {/* <CardIcon $icon_url={} /> */}
          <Text $text_weight="bold" $text_type="header"></Text>
          <Text $text_weight="thin" $text_type="header"></Text>
        </Card>
      </CardsWrapper>
    </Wrapper>
  )
});