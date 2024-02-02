import { observer } from "mobx-react-lite";

import { Modal, ModalWindow, CloseButton, Input, Header, Guide, GuideContainer, InputsContainer, ConfirmButton } from "./Links.styled";
import { modalStore } from "../../../stores/toModal.mobx";
import { verifyArtist } from "../../../stores/toVerify-artist.mobx";
import { useEffect, useState } from "react";

export const LinksModal = observer(() => {
  const[links, setLinks] = useState<Array<{ url: string }>>(Array(2).fill({ url: '' }));

  const handleSetLink = (type: 'github' | 'soundcloud', value: string) => {
    setLinks(prevState => {
      return prevState.map(link => ({ ...link }));
    });

    setLinks(prevState => {
      const newState = [...prevState];
      switch(type) {
        case "github":
          newState[0].url = value;
          break;
        case "soundcloud":
          newState[1].url = value;
          break;
      }
      return newState;
    });
  }

  useEffect(() => {
    verifyArtist.addLinks(links);
  }, [links]);

  return (
    <Modal $isOpen={modalStore.links}>
      <ModalWindow>
        <CloseButton onClick={() => modalStore.setLinks(false)} />
        <Header>Links</Header>
        <GuideContainer>
          <Guide>How to add link?</Guide>
          <Guide>To add link you must:</Guide>
          <Guide>1. Go to site (github for example).</Guide>
          <Guide>2. Copy URL.</Guide>
          <Guide>3. Return to Flowt app.</Guide>
          <Guide>4. Put URL into input.</Guide>
        </GuideContainer>
        <InputsContainer>
          <Input
            type="text"
            placeholder="github"
            onChange={(e: any) => handleSetLink('github', e.target.value)}
          />
          <Input
            type="text"
            placeholder="soundcloud"
            onChange={(e: any) => handleSetLink('soundcloud', e.target.value)}
          />
        </InputsContainer>
        <ConfirmButton
          onClick={() => modalStore.setLinks(false)}
        >Confirm</ConfirmButton>
      </ModalWindow>
    </Modal>
  );
});