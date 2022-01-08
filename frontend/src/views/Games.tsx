import * as React from "react";
import { theme } from "../theme/theme";
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import SidebarWithHeader from "../layout";

export const Games = () => {
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
            <Table variant="unstyled" w="100%">
              <Thead>
                <Tr p="2px">
                  <Th p={3}>#</Th>
                  <Th>White Player</Th>
                  <Th>Black Player</Th>
                  <Th>Year</Th>
                  <Th>Venue</Th>
                  <Th>Event</Th>
                  <Th>Game Name</Th>
                </Tr>
              </Thead>
              <Tbody></Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
