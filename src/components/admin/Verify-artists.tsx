import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { adminStore } from "../../stores/toAdmin.mobx";
import { ArtistData, ArtistDataButton, ArtistDataButtonContainer, ArtistDataContainer, ArtistDataLink, ArtistDataSpan, VerifyArtistsContainer, Wrapper } from "./Admin.styled";
import { Title as Helmet } from "../../helmet";

export const VerifyArtists = observer(() => {
  const[isFetching, setIsFetching] = useState<boolean>(false);
  const[isRequestsVerified, setIsRequestsVerified] = useState<Array<boolean>>(
    Array(adminStore.verify_artists_list.length).fill(false)
  );

  const handleScroll = (e: any) => {
    const element = e.target.documentElement;

    if(element.scrollHeight - (element.scrollTop + window.innerHeight) < 100) {
      setIsFetching(true);
      console.log('scroll', e.target.documentElement.scrollTop);
    }
  }

  useEffect(() => {
    if(isFetching) {
      adminStore.setPage(adminStore.page + 1);
      adminStore.getVerifyArtists();
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
  
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const setVerifyedRequest = async (username: string, index: number) => {
    await adminStore.applyArtist(username);

    setIsRequestsVerified((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }

  useEffect(() => {
    adminStore.setPage(0);
    adminStore.getVerifyArtists();
  }, []);

  return (
    <VerifyArtistsContainer>
      <Helmet title="Verify artist" />
      {adminStore.verify_artists_list.map((request, index) => {
        return (
          <Wrapper key={index}>
            <ArtistDataContainer>
              <ArtistData>name: 
                <ArtistDataSpan> {request.personalDataDto.name}</ArtistDataSpan>
              </ArtistData>
              <ArtistData>surname: 
                <ArtistDataSpan> {request.personalDataDto.surname}</ArtistDataSpan>
              </ArtistData>
              <ArtistData>birth date: 
                <ArtistDataSpan> {request.personalDataDto.birthDate}</ArtistDataSpan>
              </ArtistData>
              <ArtistData>sex: 
                <ArtistDataSpan> {request.personalDataDto.sex.toLowerCase()}</ArtistDataSpan>
              </ArtistData>
              <ArtistData>country: 
                <ArtistDataSpan> {request.personalDataDto.country}</ArtistDataSpan>
              </ArtistData>
              <ArtistData>passport number: 
                <ArtistDataSpan> {request.personalDataDto.passportNumber}</ArtistDataSpan>
              </ArtistData>
              {request.links.map((link, index) => (
                <ArtistData key={index}>
                  {link.url.includes('github') 
                  ? 'github: ' 
                  : 'soundcloud: '
                  }<ArtistDataLink href={link.url}>{link.url}</ArtistDataLink>
                </ArtistData>
              ))}
            </ArtistDataContainer>
            <ArtistDataButtonContainer>
              <ArtistDataButton
                $type="apply"
                disabled={isRequestsVerified[index]}
                onClick={() => setVerifyedRequest(request.username, index)}
              >apply request</ArtistDataButton>
              <ArtistDataButton $type="decline">decline request</ArtistDataButton>
            </ArtistDataButtonContainer>
          </Wrapper>
        )}
      )}
    </VerifyArtistsContainer>
  );
});