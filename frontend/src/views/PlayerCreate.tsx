import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { PlayerForm } from "../components/PlayerForm";
import { Player } from "../interfaces";
import { addPlayer } from "../services/api";
import { useHistory } from "react-router";
import { setNotification, useStateValue } from "../state";
import { useAccessToken } from "../hooks/useAccessToken";

export const PlayerCreate = () => {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const { accessToken } = useAccessToken()

  const addNewPlayer = async (playerData: FormData) => {
    try {
      await addPlayer(playerData, accessToken);
      history.push("/players");
    } catch (e) {
      console.log(e);
      dispatch(
        setNotification({ status: "error", message: "Problem with saving new player. Is API available?" })
      );
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
