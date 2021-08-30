import { useAuth0 } from "@auth0/auth0-react";
import { Button, Flex } from "@chakra-ui/react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        {children}
      </Flex>
    </Flex>
  );
}
