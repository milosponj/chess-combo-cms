import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import SidebarWithHeader from "../layout";
import { ChessboardComponent } from "../components/Chessboard";
import { useParams } from "react-router";

export const CombinationEdit = () => {
  const params = useParams();

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Text>
                Edit <Code fontSize="xl">src/CombinationEdit.tsx</Code> and save
                to reload.
              </Text>
              <Text>Editing {(params as any).id}. combination.</Text>
              <ChessboardComponent />
            </VStack>
          </Grid>
        </Box>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
