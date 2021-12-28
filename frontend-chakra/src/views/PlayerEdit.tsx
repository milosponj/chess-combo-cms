import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { setPlayer, useStateValue } from "../state";
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
      console.log(e);
    }
  }, [dispatch, params.id]);

  const editPlayer = async (playerData: FormData) => {
    try {
      await updatePlayer(player.id, playerData);
    } catch (e) {
      console.log(e);
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
