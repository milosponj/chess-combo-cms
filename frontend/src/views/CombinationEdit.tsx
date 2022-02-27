import * as React from "react";
import { theme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { Combination, CombinationEntry } from "../interfaces";
import { getCombo, updateCombo } from "../services/api";
import { useHistory, useParams } from "react-router";
import { setCombo, setNotification, useStateValue } from "../state";
import { CombinationForm } from "../components/CombinationForm";

export const CombinationEdit = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const comboFromApi: Combination = await getCombo(id);
        dispatch(setCombo(comboFromApi));
      } catch (e: any) {
        console.error(e);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const editCombo = async (combo: CombinationEntry) => {
    try {
      await updateCombo(id, combo);
      history.push("/");
    } catch (e: any) {
      console.error(e);
      dispatch(
        setNotification({
          status: "error",
          message: "Problem with editing combo. Is API available?",
        })
      );
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <CombinationForm onSubmit={editCombo}/>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
