import React from "react";

import {
  Box,
  Center,
  Heading,
  Flex,
  Image,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

export const CareersPage = () => {
  //FONT ORBITRON
  const orbitronFontFamily = "Orbitron, sans-serif";
  const orbitronWeight = {
    fontWeights: {
      normal: 400,
      medium: 600,
      semibold: 700,
      bold: 900,
    },
  };

  //FONT ROBOTO SLAB
  const robotoSlabFont = "Roboto Slab, serif";
  const robotoSlabWeight = {
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
    },
  };
  return (
    <Box
      bgColor="gray.900"
      color="whitesmoke"
      minH="100vh"
      paddingTop={"100px"}
    >
      <Flex
        align={{ base: "center", md: "flex-start" }}
        // justify={"center"}
        minH={"20vh"}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          ml={{ base: "0", md: "1.5rem" }}
          mr={{ base: "0", md: "2rem" }}
          mb={{ base: "0", md: "9rem" }}
        >
          <Heading
            color={"green.200"}
            // ml={"1.5rem"}
            fontSize={{ base: "24px", md: "50px", lg: "80px", xl: "100px" }}
            lineHeight={"1.2"}
            mt={{ base: "3rem", md: "0" }}
            ml={{ base: "0.5rem", md: "8.5rem" }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Electronic Music <br />
            Events
          </Heading>
        </Box>
      </Flex>

      <Box w={"50%"} ml={"25%"}>
        <Text
          color={"gray.200"}
          borderBottom={"1px"}
          fontFamily={robotoSlabFont}
          fontWeight={robotoSlabWeight.medium}
          fontSize={{ base: "20px", md: "1.3rem" }}
          pb={4}
        >
          Job Openings
        </Text>
      </Box>

      <Box w={"50%"} ml={{ base: "15%", md: "25%" }}>
        <Text
          color={"gray.500"}
          fontFamily={robotoSlabFont}
          fontWeight={robotoSlabWeight.medium}
          fontSize={{ base: "15px", md: "1rem" }}
          ml={"35%"}
          pt={9}
        >
          There are currently no job openings
        </Text>
      </Box>
    </Box>
  );
};
