import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setCombo, useStateValue } from "../state";
import { Combination, Game } from "../interfaces";


export const CombinationList = () => {
  const [, dispatch] = useStateValue();
  const fetchComboAndGame = async (id: number) => {
    console.log("editing specific combo");
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

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Button>Add new combination</Button>
            <Button onChange={() => fetchComboAndGame(10)}>
              Edit combination
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
