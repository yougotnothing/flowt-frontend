import { observer } from "mobx-react-lite";

import {
  Container, 
  CloseButton, 
  CloseButtonContainer, 
  Select, 
  Option, 
  ModalWindow, 
  SubmitButton,
  MainContainer,
  MainContainerText,
  TypeContainer,
} from "./Modal.styled";
import { reportStore as report } from "../../../stores/toReport.mobx";

export const Modal = observer(() => {

  return (
    <Container $isOpen={report.isOpen}>
      <ModalWindow>
        <CloseButtonContainer>
          <CloseButton onClick={() => report.setIsOpen(false)} />
        </CloseButtonContainer>
        <MainContainer>
          <TypeContainer>
            <MainContainerText>Content type</MainContainerText>
            <Select>
              <Option>Select content type</Option>
              {report.contentTypeArray.map((type, index) => (
                <Option key={index} onClick={() => report.setContentType(index)}>
                  {type === 'PROFILE_HEADER' ? 'profile header' : type.toLowerCase()}
                </Option>
              ))}
            </Select>
          </TypeContainer>
        </MainContainer>
        <SubmitButton onClick={report.sendReport}>Submit</SubmitButton>
      </ModalWindow>
    </Container>
  );
});