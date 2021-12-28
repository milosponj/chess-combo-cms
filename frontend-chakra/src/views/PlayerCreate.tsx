import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { Player } from "../interfaces";
import { addPlayer } from "../services/api";
import { useHistory } from "react-router";

export const PlayerCreate = () => {
  const history = useHistory();

  const addNewPlayer = async (playerData: FormData) => {
    try {
      await addPlayer(playerData);
      history.push("/players");
    } catch (e) {
      console.log(e);
    }
  };

  const initialPlayerState: Player = {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    dateOfBirth: undefined,
    placeOfBirth: "",
    hasAvatar: false,
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <PlayerForm player={initialPlayerState} onSubmit={addNewPlayer} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
