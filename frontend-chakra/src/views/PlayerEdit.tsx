import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider, Box, SimpleGrid } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { setPlayer, useStateValue } from "../state";
import { PlayerEntry } from "../interfaces";
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

  const editPlayer = async (playerData: PlayerEntry) => {
    try {
      await updatePlayer(player.id, playerData);
      history.push("/players");
    } catch (e) {
      console.log(e);
    }
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
            {player.id ? (
              <PlayerForm player={player} onSubmit={editPlayer} />
            ) : null}
          </Box>
        </SimpleGrid>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
