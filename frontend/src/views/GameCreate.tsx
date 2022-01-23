import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { GameEntry } from "../interfaces";
import { addGame } from "../services/api";
import { useHistory } from "react-router";
import { setNotification, useStateValue } from "../state";
import { GameForm } from "../components/GameForm";

export const GameCreate = () => {
  const history = useHistory();
  const [, dispatch] = useStateValue();

  const addNewGame = async (gameData: GameEntry) => {
    try {
      await addGame(gameData);
      history.push("/games");
    } catch (e: any) {
      if (e.response.status === 400) {
        dispatch(
          setNotification({
            status: "error",
            message: `${e.response.data}`,
          })
        );
      } else {
        dispatch(
          setNotification({
            status: "error",
            message: "Problem with saving new player. Is API available?",
          })
        );
      }
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <GameForm onSubmit={addNewGame} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
