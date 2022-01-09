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
} from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { Combination } from "../interfaces";
import { setCombo, useStateValue } from "../state";
import { getCombo } from "../services/api";
import { ChessboardComponent } from "../components/Chessboard";
import { EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";

export const Combinations = () => {
  const [{ combinations }, dispatch] = useStateValue();
  const history = useHistory();

  const editCombo = async (id: string) => {
    try {
      const combinationFromApi: Combination = await getCombo(id);
      dispatch(setCombo(combinationFromApi));
    } catch (e) {
      console.error(e);
    }
    history.push(`/combinations/${id}`);
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
            <Table variant="unstyled" w="100%">
              <Thead>
                <Tr p="2px">
                  <Th p={3}>#</Th>
                  <Th>Game</Th>
                  <Th>Description</Th>
                  <Th>Initial position</Th>
                  <Th p={3}>Moves</Th>
                  <Th p={3}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {combinations[0]
                  ? combinations.map((combo: Combination, index: number) => {
                      return (
                        <Tr key={combo.id}>
                          <Td p={3}>{index + 1}</Td>
                          <Td textAlign="right">
                            <Box className="td-box">
                              White <br />
                              {combo.game.whitePlayer.fullName}
                            </Box>
                            <Box className="td-box">
                              Black <br />
                              {combo.game.blackPlayer.fullName}
                            </Box>
                            <Box className="td-box">
                              {combo.game.date
                                ? new Date(combo.game.date).toDateString()
                                : null}
                            </Box>
                          </Td>
                          <Td width={["100", "150px", "250px", "350"]}>
                            {combo.description}
                          </Td>
                          <Td width={["150", "200px", "250px", "350"]}>
                            <ChessboardComponent
                              fen={combo.moves[0].fen}
                              id={combo.id}
                            />
                          </Td>
                          <Td p={3}>{combo.moves.length - 1}</Td>
                          <Td textAlign="center" p={3}>
                            <IconButton
                              borderRadius={50}
                              onClick={() => editCombo(combo.id)}
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
