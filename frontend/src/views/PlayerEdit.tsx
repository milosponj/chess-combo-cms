import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { setNotification, setPlayer, useStateValue } from "../state";
import { useHistory, useParams } from "react-router";
import { getPlayer, updatePlayer } from "../services/api";

export const PlayerEdit = () => {
  const [{ player }, dispatch] = useStateValue();
  const params: { id: string } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    try {
      const fetchPlayer = async () => {
        const playerFromApi = await getPlayer(params.id);
        dispatch(setPlayer(playerFromApi));
      };
      fetchPlayer();
    } catch (e) {
      dispatch(
        setNotification({ status: "error", message: "Problem with fetching. Is API available?" })
      );
    }
  }, [dispatch, params.id]);

  const editPlayer = async (playerData: FormData) => {
    try {
      await updatePlayer(player.id, playerData);
      dispatch(
        setNotification({ status: "success", message: "Player updated!" })
      );
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification({
          status: "error",
          message:
            "Something went wrong while updating player, please try again!",
        })
      );
    }
    history.replace("/players");
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        {player.id && player.id === params.id ? (
          <PlayerForm player={player} onSubmit={editPlayer} />
        ) : null}
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
