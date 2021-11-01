import {
  ChakraProvider,
  SimpleGrid,
  Box,
  theme,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  Spinner,
  Select,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "../layout";
import { ChessboardComponent } from "../components/Chessboard";
import { setCombo, useStateValue } from "../state";
import { Combination, Direction, Game, Move } from "../interfaces";
import React, { useEffect, useState } from "react";
import Chess from "chess.js";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { CustomRangeSlider } from "../components/CustomRangeSlider";
import { CustomSelect } from "../components/CustomSelect";

export const CombinationEdit = () => {
  const [{ combo }, dispatch] = useStateValue();
  const params: any = useParams();
  const [moves, setMoves] = useState<Move[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 0 });
  const [fen, setFen] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchComboAndGame = async (id: number) => {
      try {
        const { data: combinationFromApi } = await axios.get<Combination>(
          `${apiBaseUrl}/combinations/${id}`
        );
        const gameId = combinationFromApi.gameId;
        const { data: gameFromApi } = await axios.get<Game>(
          `${apiBaseUrl}/games/${gameId}`
        );
        dispatch(setCombo(combinationFromApi, gameFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchComboAndGame(params.id);
  }, [params.id, dispatch]);

  useEffect(() => {
    if (combo.id) {
      // @ts-ignore
      const chess = new Chess();
      if (chess.load_pgn(combo.game.pgn)) {
        const listOfAllGameMoves = chess.history();
        // @ts-ignore
        const chessTemp = new Chess();
        const listOfMoves: Move[] = listOfAllGameMoves.map(
          (position: string, index: number) => {
            chessTemp.move(position);
            return {
              annotation: position,
              number: index + 1,
              sign: "",
              remark: "",
              fen: chessTemp.fen(),
            };
          }
        );

        const updatedMoves: Move[] = listOfMoves.map((move) => {
          const cm = combo.moves.find((cm) => cm.number === move.number);
          return cm ? cm : move;
        });

        const initialPosition: Move = {
          annotation: "",
          number: 0,
          sign: "",
          remark: "",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        };

        const moves = [initialPosition].concat(...updatedMoves);
        setMoves(moves);
        setSliderValues({
          min: combo.moves[0].number,
          max: combo.moves[combo.moves.length - 1].number,
        });
        setIndex(0);
      }
    }
  }, [combo]);

  useEffect(() => {
    setSelectedMoves(
      moves.filter(
        (m) => m.number >= sliderValues.min && m.number <= sliderValues.max
      )
    );
  }, [sliderValues, moves]);

  useEffect(() => {
    if (selectedMoves[0]) {
      setFen(selectedMoves[0].fen);
    }
  }, [selectedMoves]);

  useEffect(() => {
    if (selectedMoves[index]?.fen) setFen(selectedMoves[index].fen);
  }, [index, selectedMoves]);

  const onArrowClick = (direction: Direction) => {
    if (index > 0 && direction === Direction.Left) {
      setIndex((i) => i - 1);
    } else if (
      index < selectedMoves.length - 1 &&
      direction === Direction.Right
    ) {
      setIndex((i) => i + 1);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <form>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.300" borderRadius={8} pb="4">
              {combo.id && moves[0] ? (
                <div>
                  <Text
                    mb={4}
                    p={["2", "2"]}
                    borderColor="gray.400"
                    borderWidth="0.5px"
                    borderRadius={4}
                    pb={6}
                  >
                    {combo.game.blackPlayer.fullName} vs{" "}
                    {combo.game.whitePlayer.fullName}
                  </Text>
                  {fen ? <ChessboardComponent fen={fen} /> : null}
                  <CustomRangeSlider
                    range={{ min: sliderValues.min, max: sliderValues.max }}
                    numberOfMoves={moves.length - 1}
                    setSliderValues={setSliderValues}
                  />
                </div>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
            </Box>
            <Box p={["6", "6"]} bg="gray.300" borderRadius={8} pb="4">
              <Box
                m={2}
                w="100%"
                h="280px"
                overflowY="scroll"
                overflowX="hidden"
                borderWidth={"0.5px"}
                borderRadius={4}
                borderColor="gray.400"
              >
                <Table variant="unstyled">
                  <Thead variant="unstyled">
                    <Tr>
                      <Th
                        w="30px"
                        p="12px"
                        borderColor="gray.400"
                        borderRightWidth="0.5px"
                        borderBottomWidth="0.5px"
                      >
                        No
                      </Th>
                      <Th
                        w="30px"
                        p="12px"
                        borderColor="gray.400"
                        borderRightWidth="0.5px"
                        borderBottomWidth="0.5px"
                      >
                        Move
                      </Th>
                      <Th
                        w="125px"
                        borderColor="gray.400"
                        borderRightWidth="0.5px"
                        borderBottomWidth="0.5px"
                      >
                        Sign
                      </Th>
                      <Th
                        borderColor="gray.400"
                        borderBottomWidth="0.5px"
                        w="200px"
                      >
                        Remark
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedMoves[0]
                      ? selectedMoves.slice(1).map((move: Move) => {
                          return (
                            <Tr
                              backgroundColor={
                                selectedMoves[index].number === move.number
                                  ? "gray.200"
                                  : ""
                              }
                              key={move.number}
                            >
                              <Td
                                w="30px"
                                p="12px"
                                borderColor="gray.400"
                                borderWidth="0.5px"
                                borderLeftWidth="0"
                              >
                                {move.number}
                              </Td>
                              <Td
                                w="30px"
                                p="12px"
                                borderColor="gray.400"
                                borderWidth="0.5px"
                              >
                                {move.annotation}
                              </Td>
                              <Td borderColor="gray.400" borderWidth="0.5px">
                                <CustomSelect sign={move.sign} />
                              </Td>
                              <Td
                                w="250px"
                                borderColor="gray.400"
                                borderWidth="0.5px"
                              >
                                <Textarea
                                  defaultValue={move.remark}
                                  size="sm"
                                />
                              </Td>
                            </Tr>
                          );
                        })
                      : null}
                  </Tbody>
                </Table>
              </Box>
              <SimpleGrid
                borderWidth="gray.500"
                w="100%"
                m={2}
                columns={2}
                spacing={2}
              >
                <Button
                  borderWidth="0.5px"
                  borderColor="gray.400"
                  backgroundColor="gray.300"
                  size="sm"
                  onClick={() => onArrowClick(Direction.Left)}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  backgroundColor="gray.300"
                  borderWidth="0.5px"
                  borderColor="gray.400"
                  size="sm"
                  onClick={() => onArrowClick(Direction.Right)}
                >
                  <ChevronRightIcon />
                </Button>
              </SimpleGrid>
              <Text w="100%" m={2} mb={0} fontWeight="semibold">
                Combination Description
              </Text>
              <Textarea
                m={2}
                borderColor="gray.400"
                resize="vertical"
                value={combo.description}
              ></Textarea>
              <Text m={2} w="100%" fontWeight="semibold">
                Combination owner
              </Text>
              <Select
                borderColor="gray.400"
                m={2}
                w="100%"
                placeholder=""
                defaultValue={
                  combo.playerId === combo.game.whitePlayerId
                    ? combo.game.whitePlayerId
                    : combo.game.blackPlayerId
                }
              >
                <option value={combo.game.whitePlayerId}>
                  {combo.game.whitePlayer.fullName}
                </option>
                <option value={combo.game.whitePlayerId}>
                  {combo.game.blackPlayer.fullName}
                </option>
              </Select>
            </Box>
          </SimpleGrid>
        </form>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
