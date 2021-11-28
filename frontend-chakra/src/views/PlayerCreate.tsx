import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider, Box, SimpleGrid } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { PlayerEntry } from "../interfaces";
import { addPlayer } from "../services/api";
import { useHistory } from "react-router";

export const PlayerCreate = () => {
  const history = useHistory();
  
  const addNewPlayer = async (playerData: PlayerEntry) => {
    try {
      await addPlayer(playerData);
      history.push("/players");
    } catch (e) {
      console.log(e);
    }
  };

  const initialPlayerState: PlayerEntry = {
    firstName: "",
    lastName: "",
    fullName: "",
    dateOfBirth: undefined,
    placeOfBirth: "",
    avatar: "",
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
            <PlayerForm player={initialPlayerState} onSubmit={addNewPlayer} />
          </Box>
        </SimpleGrid>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
