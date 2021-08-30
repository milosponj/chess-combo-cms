import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Auth0Provider
          domain={"milosponj.eu.auth0.com"}
          clientId={"pkGgznq6FUMxf6h9PQu6UYC3Mt92veDc"}
          redirectUri={"http://localhost:3000"}
        >
          <Component {...pageProps} />
        </Auth0Provider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
