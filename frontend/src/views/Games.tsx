import * as React from "react";
import { theme } from "../theme/theme";
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  Button,
} from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { initialGameState, setGame, setGames, useStateValue } from "../state";
import { Game } from "../interfaces";
import { EditIcon } from "@chakra-ui/icons";
import { getGames } from "../services/api";
import { useHistory } from "react-router-dom";

export const Games = () => {
  const [{ games }, dispatch] = useStateValue();
  const history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesFromApi: Game[] = await getGames();
        dispatch(setGames(gamesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [dispatch]);

  const editGame = (id: string) => {
    history.push(`/games/${id}`);
  };

  const addNewGame = () => {
    dispatch(setGame(initialGameState));
    history.push(`/games/add`);
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <Flex justify="left">
          <Button mb={2} width="100px" bgColor="black" onClick={addNewGame}>
            Add New
          </Button>
        </Flex>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} className="combo-box" h="100%" w="100%">
            <Table variant="unstyled" w="100%">
              <Thead>
                <Tr p="2px">
                  <Th p={3}>#</Th>
                  <Th>Players</Th>
                  <Th>Game Details</Th>
                  <Th>Event</Th>
                  <Th p={3}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {games[0]
                  ? games.map((game: Game, index: number) => {
                      return (
                        <Tr key={game.id}>
                          <Td p={3}>{index + 1}</Td>
                          <Td textAlign="right">
                            <Box className="td-box">
                              White <br />
                              {game.whitePlayer.fullName}
                            </Box>
                            <Box className="td-box">
                              Black <br />
                              {game.blackPlayer.fullName}
                            </Box>
                          </Td>
                          <Td textAlign="right">
                            <Box className="td-box">
                              Game <br />
                              {game.title}
                            </Box>
                            {game.date || game.venue ? (
                              <Box className="td-box">
                                Date & Place <br />
                                {game.date
                                  ? `${new Date(game.date)
                                      .toDateString()
                                      .slice(4, 15)}, `
                                  : null}
                                {game.venue}
                              </Box>
                            ) : null}
                          </Td>
                          <Td>{game.event}</Td>
                          <Td p={3} textAlign="center">
                            <IconButton
                              borderRadius={50}
                              onClick={() => editGame(game.id)}
                              aria-label="Edit"
                              icon={<EditIcon />}
                            />
                          </Td>
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
