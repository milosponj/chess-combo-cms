import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { Game, GameEntry } from "../interfaces";
import { getGame, updateGame } from "../services/api";
import { useHistory, useParams } from "react-router";
import { setGame, setNotification, useStateValue } from "../state";
import { GameForm } from "../components/GameForm";

export const GameEdit = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const gameFromApi: Game = await getGame(id);
        dispatch(setGame(gameFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const editGame = async (gameData: GameEntry) => {
    try {
      await updateGame(id, gameData);
      history.push("/games");
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification({
          status: "error",
          message: "Problem with editing game. Is API available?",
        })
      );
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <GameForm onSubmit={editGame} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
