import React from "react";
import { Center, Flex, Heading } from "@chakra-ui/react";

export const ChessComboLogo = () => {
  return (
    <Flex>
      <svg
        version="1.0"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 16 16"
      >
        <g>
          <polygon
            fill="#FFFFFF"
            points="5.475,10.636 5.475,14.457 0.427,14.458 0.806,10.636 	"
          />
          <polygon
            fill="#FFFFFF"
            points="14.816,10.636 15.573,14.458 10.524,14.458 10.146,10.636 	"
          />
          <polygon
            fill="#FFFFFF"
            points="9.82,7.348 10.146,10.636 5.475,10.636 5.475,7.348 	"
          />
          <polygon
            fill="#FFFFFF"
            points="13.598,4.488 14.164,7.348 9.82,7.348 9.537,4.488 	"
          />
          <polygon
            fill="#FFFFFF"
            points="1.415,4.488 5.475,4.488 5.475,7.348 1.132,7.348 	"
          />
        </g>
      </svg>
      <Center>
        <Heading px={1} size="lg">
          CMS
        </Heading>
      </Center>
    </Flex>
  );
};
