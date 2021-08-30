import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";

export default function EditCombination() {
  return (
    <Layout>
      <SimpleGrid
        flex="1"
        gap="4"
        minChildWidth="320px"
        alignItems="flex-start"
      >
        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          <Text fontSize="lg" mb="4">
            Graph 1
          </Text>
        </Box>

        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          <Text fontSize="lg" mb="4">
            Graph 2
          </Text>
        </Box>
      </SimpleGrid>
    </Layout>
  );
}
