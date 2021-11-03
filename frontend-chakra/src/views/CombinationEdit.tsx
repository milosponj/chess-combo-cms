import {
  ChakraProvider,
  SimpleGrid,
  Box,
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
  Flex,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "../layout";
import { ChessboardComponent } from "../components/Chessboard";
import { setCombo, useStateValue } from "../state";
import {
  Combination,
  Direction,
  EditCombinationRequest,
  Game,
  Move,
} from "../interfaces";
import React, { useEffect, useState } from "react";
import Chess from "chess.js";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { CustomRangeSlider } from "../components/CustomRangeSlider";
import { useHistory } from "react-router-dom";
import { theme } from "../theme";

export const CombinationEdit = () => {
  const [{ combo }, dispatch] = useStateValue();
  const params: any = useParams();
  const [moves, setMoves] = useState<Move[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 0 });
  const [fen, setFen] = useState("");
  const [index, setIndex] = useState(0);
  const [comboOwnerId, setComboOwnerId] = useState("");
  const [comboDescription, setComboDescription] = useState("");
  let history = useHistory();

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
        setComboOwnerId(combinationFromApi.playerId.toString());
        setComboDescription(
          combinationFromApi.description ? combinationFromApi.description : ""
        );
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

  const sendEditComboRequest = async (ev: any) => {
    ev.preventDefault();
    try {
      const requestBody: EditCombinationRequest = {
        gameId: combo.gameId,
        id: combo.id,
        playerId: parseInt(comboOwnerId),
        description: comboDescription,
        combination: selectedMoves,
      };
      await axios.put<Combination>(
        `${apiBaseUrl}/combinations/${combo.id}`,
        requestBody
      );
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoveChange = (
    remark: string,
    sign: string,
    moveNumber: number
  ) => {
    const updatedMove = selectedMoves.find((m) => m.number === moveNumber)!;
    updatedMove.remark = remark;
    updatedMove.sign = sign;

    setSelectedMoves(
      selectedMoves.map((m) => (m.number === moveNumber ? updatedMove : m))
    );
  };

  const selectOptions: string[] = ["", "!", "!!", "?", "??", "!?", "?!"];

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <form onSubmit={sendEditComboRequest}>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} className="combo-box" h="600px">
              {combo.id && moves[0] ? (
                <div>
                  <Text
                    mb={4}
                    p={["2", "2"]}
                    borderColor="gray.800"
                    borderWidth="0.5px"
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
                  color="gray.500"
                  size="xl"
                />
              )}
            </Box>
            {combo.id && moves[0] ? (
              <div>
                <Box p={["6", "6"]} className="combo-box" h="600px">
                  <Box
                    m={2}
                    w="100%"
                    h="280px"
                    overflowY="scroll"
                    overflowX="hidden"
                  >
                    <Table variant="unstyled">
                      <Thead variant="unstyled">
                        <Tr>
                          <Th borderWidth="0.5px"  w="30px" p="10px">
                            No
                          </Th>
                          <Th borderWidth="0.5px" w="30px" p="10px">
                            Move
                          </Th>
                          <Th borderWidth="0.5px" w="60px" p="10px">
                            Sign
                          </Th>
                          <Th borderWidth="0.5px" w="200px" p="10px">
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
                                      ? "gray.900"
                                      : ""
                                  }
                                  key={move.number}
                                >
                                  <Td fontSize="md" borderWidth="0.5px" w="30px" p="10px">
                                    {move.number}
                                  </Td>
                                  <Td fontSize="md" borderWidth="0.5px" w="30px" p="10px">
                                    {move.annotation}
                                  </Td>
                                  <Td borderWidth="0.5px" w="60px" p="10px">
                                    <Select
                                      placeholder=""
                                      borderRadius={0}
                                      onChange={(ev) =>
                                        handleMoveChange(
                                          move.remark,
                                          ev.currentTarget.value,
                                          move.number
                                        )
                                      }
                                      value={move.sign ? move.sign : ""}
                                    >
                                      {selectOptions.map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </Select>
                                  </Td>
                                  <Td borderWidth="0.5px" w="200px" p="10px">
                                    <Textarea
                                      borderWidth={0}
                                      m={0}
                                      p={0}
                                      onChange={(ev) =>
                                        handleMoveChange(
                                          ev.currentTarget.value,
                                          move.sign,
                                          move.number
                                        )
                                      }
                                      value={move.remark ? move.remark : ""}
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
                  <SimpleGrid w="100%" m={2} columns={2} spacing={2}>
                    <Button
                      size="sm"
                      onClick={() => onArrowClick(Direction.Left)}
                    >
                      <ChevronLeftIcon />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onArrowClick(Direction.Right)}
                    >
                      <ChevronRightIcon />
                    </Button>
                  </SimpleGrid>
                  <Text w="100%" m={2} mb={0}>
                    Combination Description
                  </Text>
                  <Textarea
                    borderRadius={0}
                    m={2}
                    resize="vertical"
                    onChange={(ev) =>
                      setComboDescription(ev.currentTarget.value)
                    }
                    value={comboDescription}
                  ></Textarea>
                  <Text m={2} w="100%">
                    Combination owner
                  </Text>
                  <Select
                    borderRadius={0}
                    m={2}
                    w="100%"
                    onChange={(ev) => setComboOwnerId(ev.currentTarget.value)}
                    value={comboOwnerId}
                  >
                    <option value={combo.game.whitePlayerId}>
                      {combo.game.whitePlayer.fullName}
                    </option>
                    <option value={combo.game.blackPlayerId}>
                      {combo.game.blackPlayer.fullName}
                    </option>
                  </Select>
                </Box>{" "}
              </div>
            ) : null}
          </SimpleGrid>
          <Flex justify="right">
            <Button mt={2} pl={6} pr={6} bgColor="black" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
