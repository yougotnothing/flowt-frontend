import { Container, MobileContainer, Wrapper } from "../../Home.styled"
import { LastListened } from "../last-listened/Last-listened"
import { LikedPlaylists } from "../liked-playlists/Liked-playlists"
import { Recommendations } from "../recommendations/Recommendations"

export const PlaylistsSongs: React.FC<{ size: 'small' | 'big' }> = ({ size }) => {
  return (
    <>
      {size === 'small' ? (
        <Container $size={size}>
          <Recommendations />
          <LastListened size={size} />
          <LikedPlaylists size={size} />
        </Container>
      ) : (
        <Container $size={size}>
          <Wrapper>
            <LastListened size={size} />
            <Recommendations />
            <LikedPlaylists size={size} />
          </Wrapper>
        </Container>
      )}
    </>
  )
}