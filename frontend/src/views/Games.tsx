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
import { useStateValue } from "../state";
import { Game } from "../interfaces";
import { EditIcon } from "@chakra-ui/icons";

export const Games = () => {
  const [{ games }] = useStateValue();

  const editGame = (id: string) => {
    console.log("editing game logic", id);
  };

  const addNewGame = () => {
    console.log("adding game logic");
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
                            <Box borderWidth={0} className="td-box">
                              {game.title} <br />
                              {game.date
                                ? new Date(game.date).getFullYear()
                                : null}
                              {", "}
                              {game.venue}
                              <></>
                            </Box>
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
