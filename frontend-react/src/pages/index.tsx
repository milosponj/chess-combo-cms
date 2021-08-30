import { useAuth0 } from "@auth0/auth0-react";
import { Flex, SimpleGrid, Box, Text, theme, Button } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import Layout from "../components/Layout";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  zoom: {
    enabled: false,
  },
  foreColor: theme.colors.gray[500],
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray["600"],
    },
    axisTicks: {
      color: theme.colors.gray["600"],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
} as ApexOptions;

const series = [{ name: "series_1", data: [31, 120, 10, 28, 51, 18, 109] }];

export default function Dashboard() {
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
          <Chart options={options} series={series} type="area" height={160} />
        </Box>

        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          <Text fontSize="lg" mb="4">
            Graph 2
          </Text>
          <Chart options={options} series={series} type="area" height={160} />
        </Box>
      </SimpleGrid>
    </Layout>
  );
}
