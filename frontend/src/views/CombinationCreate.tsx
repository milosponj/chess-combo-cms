import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { CombinationEntry } from "../interfaces";
import { addCombo } from "../services/api";
import { useHistory } from "react-router";
import { CombinationForm } from "../components/CombinationForm";
import { setNotification, useStateValue } from "../state";

export const CombinationCreate = () => {
  const history = useHistory();
  const [, dispatch] = useStateValue();

  const createCombo = async (combo: CombinationEntry) => {
    try {
      await addCombo(combo);
      history.push("/combinations");
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
            message: "Problem with saving new combo. Is API available?",
          })
        );
      }
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <CombinationForm onSubmit={createCombo} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
