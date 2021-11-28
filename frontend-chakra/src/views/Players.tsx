import * as React from "react";
import { theme } from "../theme/theme";
import {
  ChakraProvider,
  Box,
  Button,
  SimpleGrid,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tag,
  Icon,
} from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { Player } from "../interfaces";
import { CheckIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { setPlayers, useStateValue } from "../state";
import { useHistory } from "react-router";
import { getPlayers } from "../services/api";

export const Players = () => {
  const [{ players }, dispatch] = useStateValue();
  const history = useHistory();
  React.useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersFromApi: Player[] = await getPlayers();
        dispatch(setPlayers(playersFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPlayers();
  }, [dispatch]);

  const editPlayer = async (id: string) => {
    history.push(`/players/${id}`);
  };

  const addNewPlayer = () => {
    history.push(`/players/add`);
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} className="combo-box" h="100%" w="100%">
            <Flex justify="left">
              <Button mb={2} bgColor="black" onClick={addNewPlayer}>
                Add New
              </Button>
            </Flex>
            <Table variant="unstyled" w="100%">
              <Thead>
                <Tr p="2px">
                  <Th p={3}>#</Th>
                  <Th>Name</Th>
                  <Th>Birth Date</Th>
                  <Th>Birth Place</Th>
                  <Th p={3}>Avatar</Th>
                  <Th p={3}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {players[0]
                  ? players.map((player: Player, index: number) => {
                      return (
                        <Tr key={player.id}>
                          <Td p={3}>{index + 1}</Td>
                          <Td>{player.fullName}</Td>
                          <Td>
                            {player.dateOfBirth
                              ? new Date(player.dateOfBirth).toDateString()
                              : null}
                          </Td>
                          <Td>{player.placeOfBirth}</Td>
                          <Td>
                            {player.avatar ? (
                              <Tag size="lg" colorScheme="teal">
                                <Icon as={CheckIcon} />
                              </Tag>
                            ) : (
                              <Tag size="lg" colorScheme="red">
                                <Icon as={SmallCloseIcon} />
                              </Tag>
                            )}
                          </Td>
                          <Td textAlign="center" p={3}>
                            <IconButton
                              borderRadius={50}
                              onClick={() => editPlayer(player.id)}
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
