import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { PlayerEntry } from "../interfaces";
import { useHistory } from "react-router";

interface Props {
  player: PlayerEntry;
  onSubmit: (values: PlayerEntry) => void;
}

export const PlayerForm = ({ player, onSubmit }: Props) => {
  const [firstName, setFirstName] = React.useState(player.firstName);
  const [lastName, setLastName] = React.useState(player.lastName);
  const [dateOfBirth, setDateOfBirth] = React.useState(player.fullName);
  const [placeOfBirth, setPlaceOfBirth] = React.useState(player.placeOfBirth);
  const [avatar, setAvatar] = React.useState(player.avatar);
  const history = useHistory();

  const saveChanges = () => {
    const playerData: PlayerEntry = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      dateOfBirth: new Date(dateOfBirth),
      placeOfBirth,
      avatar,
    };
    onSubmit(playerData);
  };

  const cancel = () => {
    history.push("/players");
  };

  return (
    <Box w="500px">
      <FormControl id="first-name" isRequired>
        <FormLabel>First name</FormLabel>
        <Input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          borderRadius={0}
          mb={3}
          placeholder="First name"
        />
      </FormControl>
      <FormControl id="last-name" isRequired>
        <FormLabel>Last name</FormLabel>
        <Input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          borderRadius={0}
          mb={3}
          placeholder="Last name"
        />
      </FormControl>
      <FormControl id="date-of-birth">
        <FormLabel>Birth Date</FormLabel>
        <Input
          value={dateOfBirth}
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
      <FormControl id="avatar">
        <FormLabel>Avatar</FormLabel>
        <Input
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          borderRadius={0}
          mb={3}
          placeholder="Avatar"
        />
      </FormControl>
      <Flex justify="right">
        <Button mt={2} width="100px" bgColor="black" onClick={saveChanges}>
          Save
        </Button>
        <Button mt={2} ml={2} width="100px" bgColor="black" onClick={cancel}>
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};
