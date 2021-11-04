import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    body: "'Oswald', sans-serif, 'Arial', sans-serif",
    heading: "'Oswald', sans-serif, 'Arial', sans-serif",
  },
  colors: {
    primary: {
      100: "#fbf5eb",
      200: "#f3e3c1",
      300: "#e1c993",
      400: "#bfa980",
      500: "#9a8669",
      600: "#756351",
      700: "#514238",
      800: "#322621",
      900: "#190e0d",
    },
    gray: {
      100: "#f9f9f9",
      200: "#e7e7e7",
      300: "#cdcdcd",
      400: "#adadad",
      500: "#8b8b8b",
      600: "#676767",
      700: "#464646",
      800: "#292929",
      900: "#111111",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "0",
        borderWidth: "0.5px",
        borderColor: "gray.800",
        _hover: {
          boxShadow: "rgb(0 0 0 / 99%) 0px 5px 10px",
        },
      },
    },
    Select: {
      default: {
        textColor: "red",
      },
      baseStyle: {
        bg: "red",
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        textColor: mode("gray.500", "gray.100")(props),
        bg: mode("gray.100", "gray.900")(props),
        fontSize: 20,
        height: "100%",
        minHeight: "100%",
      },
      html: {
        height: "100%",
      },
    }),
  },
});
