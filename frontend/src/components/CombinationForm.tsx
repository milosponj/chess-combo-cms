import {
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
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ChessboardComponent } from "./Chessboard";
import { initialComboState, setCombo, setGames, useStateValue } from "../state";
import { CombinationEntry, Direction, Game, Move } from "../interfaces";
import React, { useEffect, useState } from "react";
import Chess from "chess.js";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { useHistory } from "react-router-dom";
import { getGames } from "../services/api";
import {
  ChakraStylesConfig,
  Select as ChakraSelect,
} from "chakra-react-select";

interface Props {
  onSubmit: (values: CombinationEntry) => void;
}

interface Item {
  value: string;
  label: string;
}

export const CombinationForm = ({ onSubmit }: Props) => {
  const [{ combo, games }, dispatch] = useStateValue();
  const [moves, setMoves] = useState<Move[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 0 });
  const [fen, setFen] = useState("");
  const [index, setIndex] = useState(0);
  const [comboDescription, setComboDescription] = useState("");
  const [selectGameItems, setSelectGameItems] = React.useState<Item[]>([]);
  const [selectedGame, setSelectedGame] = React.useState<Item>({
    value: "",
    label: "",
  });
  const history = useHistory();
  const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const selectSignOptions: string[] = ["", "!", "!!", "?", "??", "!?", "?!"];

  const chakraStyles: ChakraStylesConfig = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0px",
      mb: "12px",
    }),
  };

  useEffect(() => {
    if (combo.game.id) {
      setComboDescription(combo.description || "");
      const year = combo.game.date && new Date(combo.game.date).getFullYear();
      setSelectedGame({
        label: `${combo.game.whitePlayer.fullName} vs ${
          combo.game.blackPlayer.fullName
        } ${year ? `${-year}` : null}`,
        value: combo.game.id,
      });
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
          const comboMove = combo.moves.find((cm) => cm.number === move.number);
          return comboMove || move;
        });

        const initialPosition: Move = {
          annotation: "",
          number: 0,
          sign: "",
          remark: "",
          fen: initialFen,
        };

        const moves = [initialPosition].concat(...updatedMoves);
        setMoves(moves);
        setSliderValues({
          min: combo.moves[0].number,
          max:
            combo.moves[combo.moves.length - 1].number === 0
              ? listOfAllGameMoves.length
              : combo.moves[combo.moves.length - 1].number,
        });
        setIndex(0);
      }
    }
    if (!combo.game.id) {
      const fetchGames = async () => {
        try {
          const gamesFromApi: Game[] = await getGames();
          dispatch(setGames(gamesFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchGames();
    }
  }, [combo, dispatch]);

  useEffect(() => {
    if (games?.length) {
      const gameOptions = games.map((game) => ({
        value: game.id,
        label: `${game.whitePlayer.fullName} vs ${
          game.blackPlayer.fullName
        } - ${game.date ? new Date(game.date).getFullYear() : ""}`,
      }));
      setSelectGameItems(gameOptions);
    }
  }, [games]);

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

  const handleGameSelection = (gameItem: any) => {
    const game = games.find((game) => game.id === gameItem.value);
    dispatch(
      setCombo({ ...initialComboState, game: game || initialComboState.game })
    );
    setSelectedGame(gameItem);
  };

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

  const saveChanges = (event: any) => {
    event.preventDefault();
    const editedCombo: CombinationEntry = {
      game: combo.game,
      description: comboDescription,
      moves: selectedMoves,
    };
    onSubmit(editedCombo);
  };

  const cancel = () => {
    history.replace("/combinations");
  };

  return (
    <>
      <SimpleGrid
        flex="1"
        gap="4"
        minChildWidth="320px"
        alignItems="flex-start"
      >
        <Box p={["6", "8"]} className="combo-box" h="100%">
          {combo.game ? (
            <div>
              <Text w="100%" m={2} mb={2} mt={0}>
                Selected Game
              </Text>
              <ChakraSelect
                chakraStyles={chakraStyles}
                options={selectGameItems}
                value={selectedGame}
                onChange={(value) => handleGameSelection(value)}
                isDisabled={combo.id ? true : false}
                placeholder="Select game..."
              />
              {fen ? (
                <ChessboardComponent fen={fen} id={combo.id} />
              ) : (
                <ChessboardComponent fen={initialFen} id={"empty board"} />
              )}
              <CustomRangeSlider
                range={{ min: sliderValues.min, max: sliderValues.max }}
                numberOfMoves={moves[0] ? moves.length - 1 : 1}
                setSliderValues={setSliderValues}
              />
            </div>
          ) : null}
        </Box>
        <Box p={["6", "6"]} className="combo-box" h="660px">
          <Text w="100%" m={2} mb={0}>
            Selected Moves
          </Text>
          <Box
            m={2}
            w="100%"
            h="280px"
            borderWidth="1px"
            overflowY="scroll"
            overflowX="hidden"
          >
            <Table variant="unstyled">
              <Thead variant="unstyled">
                <Tr>
                  <Th
                    w="30px"
                    p="10px"
                    borderLeftWidth="0px"
                    borderTopWidth="0px"
                  >
                    No
                  </Th>
                  <Th w="30px" p="10px" borderTopWidth="0px">
                    Move
                  </Th>
                  <Th w="60px" p="10px" borderTopWidth="0px">
                    Sign
                  </Th>
                  <Th w="200px" p="10px" borderTopWidth="0px">
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
                          <Td w="30px" p="10px">
                            {move.number}
                          </Td>
                          <Td w="30px" p="10px">
                            {move.annotation}
                          </Td>
                          <Td w="60px" p="10px">
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
                              {selectSignOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Select>
                          </Td>
                          <Td w="200px" p="10px">
                            <Textarea
                              borderWidth={0}
                              size="sm"
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
            <Button size="sm" onClick={() => onArrowClick(Direction.Left)}>
              <ChevronLeftIcon />
            </Button>
            <Button size="sm" onClick={() => onArrowClick(Direction.Right)}>
              <ChevronRightIcon />
            </Button>
          </SimpleGrid>
          <Text w="100%" m={2} mt={5} mb={0}>
            Combination Description
          </Text>
          <Textarea
            borderRadius={0}
            m={2}
            h="160px"
            resize="vertical"
            onChange={(ev) => setComboDescription(ev.currentTarget.value)}
            value={comboDescription}
          ></Textarea>
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
