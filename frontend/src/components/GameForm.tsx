import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  SimpleGrid,
  Textarea,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { GameEntry } from "../interfaces";
import { useHistory } from "react-router";
import { setNotification, useStateValue } from "../state";
import { ChakraStylesConfig, Select } from "chakra-react-select";

interface Item {
  value: string;
  label: string;
}

interface Props {
  onSubmit: (values: GameEntry) => void;
}

export const GameForm = ({ onSubmit }: Props) => {
  const [{ players, notification, game }, dispatch] = useStateValue();
  const [whitePlayerItem, setWhitePlayerItem] = React.useState<Item>({
    value: game.whitePlayer.id,
    label: game.whitePlayer.fullName,
  });
  const [blackPlayerItem, setBlackPlayerItem] = React.useState<Item>({
    value: game.blackPlayer.id,
    label: game.blackPlayer.fullName,
  });
  const [pgn, setPgn] = React.useState(game.pgn);
  const [title, setTitle] = React.useState(game.title);
  const [venue, setVenue] = React.useState(game.venue);
  const [date, setDate] = React.useState(game.date);
  const [eventName, setEventName] = React.useState(game.event);
  const [selectItems, setSelectItems] = React.useState<Item[]>([]);
  const history = useHistory();
  const [isWhitePlayerSelected, setIsWhitePlayerSelected] =
    React.useState(true);
  const [isBlackPlayerSelected, setIsBlackPlayerSelected] =
    React.useState(true);
  const [isPgnPopulated, setIsPgnPopulated] = React.useState(true);
  const [isGameNamePopulated, setIsGameNamePopulated] = React.useState(true);
  const [isValidating, setIsValidating] = React.useState(false);
  const toast = useToast();

  const chakraStyles: ChakraStylesConfig = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0px",
      mb: "12px",
    }),
  };
  React.useEffect(() => {
    setWhitePlayerItem({
      value: game.whitePlayer.id,
      label: game.whitePlayer.fullName,
    });
    setBlackPlayerItem({
      value: game.blackPlayer.id,
      label: game.blackPlayer.fullName,
    });
    setPgn(game.pgn);
    setTitle(game.title);
    setVenue(game.venue);
    setDate(game.date);
    setEventName(game.event);
  }, [game]);

  React.useEffect(() => {
    if (notification.message && notification.status) {
      toast({
        title: notification.message,
        status: notification.status,
        duration: 5000,
        isClosable: true,
      });
      dispatch(setNotification({ message: "" }));
    }
  }, [notification, toast, dispatch]);

  React.useEffect(() => {
    if (players) {
      const playerOptions = players.map((player) => ({
        value: player.id,
        label: player.fullName,
      }));
      setSelectItems(playerOptions);
    }
  }, [players]);

  React.useEffect(() => {
    if (isValidating) {
      setIsWhitePlayerSelected(whitePlayerItem.value !== "");
      setIsBlackPlayerSelected(blackPlayerItem.value !== "");
      setIsPgnPopulated(pgn.length >= 2);
      setIsGameNamePopulated(title.length >= 2);
    }
  }, [whitePlayerItem, blackPlayerItem, pgn, title, isValidating]);

  const validate = (): Boolean => {
    setIsValidating(true);
    if (
      whitePlayerItem.value &&
      blackPlayerItem.value &&
      pgn.length >= 2 &&
      title.length >= 2
    ) {
      return true;
    }
    return false;
  };

  const saveChanges = async (event: any) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      const whitePlayer: any = players.find(
        (p) => p.id === whitePlayerItem.value
      );
      const blackPlayer: any = players.find(
        (p) => p.id === blackPlayerItem.value
      );
      if (whitePlayer.id && blackPlayer.id) {
        const requestBody: GameEntry = {
          whitePlayer: { ...whitePlayer },
          blackPlayer: { ...blackPlayer },
          pgn: pgn,
          title: title,
          venue: venue,
          date: date ? new Date(date) : undefined,
          event: eventName,
        };
        onSubmit(requestBody);
      }
    }
  };

  const cancel = () => {
    history.replace("/games");
  };

  const handleWhitePlayerSelection = (value: any) => {
    setWhitePlayerItem(value);
  };

  const handleBlackPlayerSelection = (value: any) => {
    setBlackPlayerItem(value);
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
            id="white-player"
            isRequired
            isInvalid={!isWhitePlayerSelected}
          >
            <FormLabel>White Player</FormLabel>
            <Select
              chakraStyles={chakraStyles}
              options={selectItems}
              value={whitePlayerItem}
              onChange={(value) => handleWhitePlayerSelection(value)}
            />
            {isWhitePlayerSelected ? null : (
              <FormErrorMessage>
                White Player must be selected.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="black-player"
            isRequired
            isInvalid={!isBlackPlayerSelected}
          >
            <FormLabel>Black Player</FormLabel>
            <Select
              chakraStyles={chakraStyles}
              options={selectItems}
              value={blackPlayerItem}
              onChange={(value) => handleBlackPlayerSelection(value)}
            />
            {isBlackPlayerSelected ? null : (
              <FormErrorMessage>
                Black Player must be selected.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="pgn" isRequired isInvalid={!isPgnPopulated}>
            <FormLabel>PGN</FormLabel>
            <Textarea
              borderRadius={0}
              h="125px"
              resize="vertical"
              onChange={(ev) => setPgn(ev.currentTarget.value)}
              value={pgn}
            ></Textarea>
            {isPgnPopulated ? null : (
              <FormErrorMessage>
                PGN is required, and must be at least two char long.
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box p={["6", "8"]} className="combo-box" h="100%">
          <FormControl id="title" isRequired isInvalid={!isGameNamePopulated}>
            <FormLabel>Game Name</FormLabel>
            <Input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              borderRadius={0}
              mb={3}
              placeholder="Game Name"
            />
            {isGameNamePopulated ? null : (
              <FormErrorMessage>
                Title is required, and must be at least two char long.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="venue">
            <FormLabel>Venue</FormLabel>
            <Input
              value={venue}
              onChange={(event) => setVenue(event.currentTarget.value)}
              borderRadius={0}
              mb={3}
              placeholder="Venue"
            />
          </FormControl>

          <FormControl id="date">
            <FormLabel>Date</FormLabel>
            <Input
              value={date}
              onChange={(event) => setDate(event.currentTarget.value)}
              borderRadius={0}
              mb={3}
              placeholder="Date"
            />
          </FormControl>
          <FormControl id="event">
            <FormLabel>Event</FormLabel>
            <Input
              value={eventName}
              onChange={(event) => setEventName(event.currentTarget.value)}
              borderRadius={0}
              mb={3}
              placeholder="Event"
            />
          </FormControl>
        </Box>
      </SimpleGrid>
      <Flex justify="right">
        <Button
          mt={2}
          width="100px"
          bgColor="black"
          onClick={(event) => saveChanges(event)}
        >
          Save
        </Button>
        <Button mt={2} ml={2} width="100px" bgColor="black" onClick={cancel}>
          Cancel
        </Button>
      </Flex>
    </>
  );
};
