import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/alert";
import { useDisclosure, CloseButton } from "@chakra-ui/react";

export const AlertSuccess: React.FC = () => {
  const[isDisable, setIsDisable] = useState(false);
  const[alertParams, setAlertParams] = useSearchParams();
  const successAlert = localStorage.getItem('success');

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({defaultIsOpen: true});

  return (isVisible && successAlert) ? (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="row"
      justifyContent="center"
      marginTop="5%"
      marginLeft="2%"
      alignSelf="start"
      width="max-content"
      textAlign="center"
      position="absolute"
      backgroundColor="#55a34be8"
      padding={10}
      color="#ffc400"
      borderRadius={20}
    >
    <AlertIcon
      color="#6aff57"
      boxSize="40px"
      mr={0} 
    />
    <div style={{flexDirection: "column", margin: "20px"}}>
      <AlertTitle 
        mt={4}
        mb={1}
        fontSize={22}
        fontFamily="'Raleway', sans-serif"
        fontWeight="800"
      >
        Email verification successful!
      </AlertTitle>
      <AlertDescription
        fontFamily="'Urbanist', sans-serif"
        fontSize="14px"
        fontWeight="600"
      >
        Now you can upload songs, try it!
      </AlertDescription>
    </div>
    <CloseButton  
      color="#6aff57"
      background="none"
      border="none"   
      opacity={50}
      alignSelf="flex-start"
      right={-1}
      top={-1}
      onClick={() => { 
        localStorage.removeItem('success');
        onClose();
        }
      }
      transition="all 0.5s"
    />
  </Alert>
  ) : null;
}

export const AlertWarning: React.FC = () => {
  const warningAlert = localStorage.getItem('warning');

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({defaultIsOpen: true})
  
  return (isVisible && warningAlert) ? (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="row"
      justifyContent="center"
      marginTop="5%"
      marginLeft="2%"
      alignSelf="start"
      width="max-content"
      textAlign="center"
      position="absolute"
      backgroundColor="#ad7a0a"
      padding={10}
      color="#3f3f40"
      borderRadius={20}
    >
    <AlertIcon
      color="#ffc400"
      boxSize="40px"
      mr={0} 
    />
    <div style={{flexDirection: "column", margin: "20px"}}>
      <AlertTitle
        mt={4}
        mb={1}
        fontFamily="'Raleway', sans-serif"
        fontSize={22}
        fontWeight="800"
      >
        Email already verifyed
      </AlertTitle>
    </div>
    <CloseButton  
      color="#3f3f40"
      background="none"
      border="none"   
      opacity={50}
      alignSelf="flex-start"
      right={-1}
      top={-1}
      onClick={() => { 
        localStorage.removeItem('warning');
        onClose();
        }
      }
      transition="all 0.5s"
    />
  </Alert>
  ) : null;
}