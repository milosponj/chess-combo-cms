import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Image,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Player } from "../interfaces";
import { useHistory } from "react-router";
import { CloseIcon } from "@chakra-ui/icons";
import { avatarBaseUrl } from "../constants";
import { isExtensionPng } from "../utils";

interface Props {
  player: Player;
  onSubmit: (values: FormData) => void;
}

export const PlayerForm = ({ player, onSubmit }: Props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(
    player.dateOfBirth ? player.dateOfBirth.toString() : ""
  );
  const [placeOfBirth, setPlaceOfBirth] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState("");
  const [avatarData, setAvatarData] = React.useState<any>(null);
  const [isFirstNameInvalid, setIsFirstNameInvalid] = React.useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = React.useState(false);
  const [isPictureExtensionInvalid, setIsPictureExtensionInvalid] =
    React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    setFirstName(player.firstName);
    setLastName(player.lastName);
    setDateOfBirth(player.dateOfBirth ? player.dateOfBirth.toString() : "");
    setPlaceOfBirth(player.placeOfBirth ? player.placeOfBirth : "");
    setAvatarURL(player.hasAvatar ? `${avatarBaseUrl}/${player.id}.png` : "");
  }, [player]);

  React.useEffect(() => {
    if (isValidating) {
      setIsFirstNameInvalid(firstName.length < 2);
      setIsLastNameInvalid(lastName.length < 2);
      if (avatarData) {
        setIsPictureExtensionInvalid(!isExtensionPng(avatarData.type));
      }
    }
  }, [firstName, lastName, avatarData, isValidating]);

  const validate = (): Boolean => {
    const isAvatarInvalid = avatarData
      ? !isExtensionPng(avatarData.type)
      : false;

    setIsValidating(true);
    if (firstName.length < 2 || lastName.length < 2 || isAvatarInvalid) {
      return false;
    }
    return true;
  };

  const saveChanges = () => {
    const isValid = validate();
    if (isValid) {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("fullName", `${firstName} ${lastName}`);
      data.append(
        "dateOfBirth",
        dateOfBirth ? new Date(dateOfBirth).toUTCString() : ""
      );
      data.append("placeOfBirth", placeOfBirth);
      if (avatarData) {
        data.append("avatar", avatarData);
      }
      if (player.hasAvatar || avatarData) {
        data.append("hasAvatar", "true");
      }
      onSubmit(data);
    }
  };

  const cancel = () => {
    history.replace("/players");
  };

  const fileSelectedHandler = (event: React.BaseSyntheticEvent) => {
    setAvatarData(event.target.files[0]);
  };

  const removeFile = () => {
    if (document.getElementById("myAvatarFile")) {
      (document.getElementById("myAvatarFile") as HTMLInputElement).value = "";
    }
    setAvatarData(null);
    setAvatarURL("");
    setIsPictureExtensionInvalid(false);
  };

  return (
    <>
      <SimpleGrid
        flex="1"
        gap="4"
        minChildWidth="320px"
        alignItems="flex-start"
      >
        <Box p={["6", "8"]} className="combo-box" h="100%" w="100%">
          <FormControl
            id="first-name"
            isRequired
            isInvalid={isFirstNameInvalid}
          >
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              borderRadius={0}
              mb={3}
              placeholder="First name"
            />
            {isFirstNameInvalid ? (
              <FormErrorMessage>
                First name is required and must be longer than two char.
              </FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl id="last-name" isRequired isInvalid={isLastNameInvalid}>
            <FormLabel>Last name</FormLabel>
            <Input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              borderRadius={0}
              mb={3}
              placeholder="Last name"
            />
            {isLastNameInvalid ? (
              <FormErrorMessage>
                Last name is required and must be longer than two char.
              </FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl id="date-of-birth">
            <FormLabel>Birth Date</FormLabel>
            <Input
              value={dateOfBirth.slice(0, 10)}
              onChange={(event) => setDateOfBirth(event.target.value)}
              borderRadius={0}
              mb={3}
              placeholder="Birth date"
              type="date"
            />
          </FormControl>
          <FormControl id="place-of-birth">
            <FormLabel>Birth Place</FormLabel>
            <Input
              value={placeOfBirth}
              onChange={(event) => setPlaceOfBirth(event.target.value)}
              borderRadius={0}
              mb={3}
              placeholder="Birth place"
            />
          </FormControl>
        </Box>
        <Box p={["6", "8"]} className="combo-box" h="100%">
          <FormControl id="avatar" isInvalid={isPictureExtensionInvalid}>
            <FormLabel>Avatar</FormLabel>
            <InputGroup>
              <Input
                p={2}
                id={"myAvatarFile"}
                onChange={(event) => fileSelectedHandler(event)}
                borderRadius={0}
                mb={3}
                placeholder="Avatar"
                type="file"
                accept=".png"
              />
              <InputRightElement
                children={
                  <IconButton
                    aria-label="remove file"
                    onClick={removeFile}
                    icon={<CloseIcon />}
                    isDisabled={!avatarData}
                  />
                }
              />
            </InputGroup>
            {isPictureExtensionInvalid ? (
              <FormErrorMessage>
                Picture must have png extension.
              </FormErrorMessage>
            ) : null}
          </FormControl>
          {avatarData ? (
            <Image src={URL.createObjectURL(avatarData)} />
          ) : avatarURL ? (
            <Image src={avatarURL} />
          ) : (
            ""
          )}
        </Box>
      </SimpleGrid>
      <Flex justify="right">
        <Button mt={2} width="100px" bgColor="black" onClick={saveChanges}>
          Save
        </Button>
        <Button mt={2} ml={2} width="100px" bgColor="black" onClick={cancel}>
          Cancel
        </Button>
      </Flex>
    </>
  );
};
