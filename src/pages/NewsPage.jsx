import React, { useContext } from "react";
import DataContext from "../components/Root";
import Typewriter from "../components/Typewriter";

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

export const NewsPage = () => {
  const { header } = useContext(DataContext);

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
    <Box bgColor="gray.900" minH="100vh" paddingTop={"100px"}>
      <Flex
        align={{ base: "center", md: "flex-start" }}
        // justify={"center"}
        minH={"20vh"}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          ml={{ base: "0", md: "1.5rem" }}
          mr={{ base: "0", md: "2rem" }}
          mb={{ base: "0", md: "5rem" }}
        >
          <Heading
            color={"green.200"}
            // ml={"1.5rem"}
            fontSize={{ base: "24px", md: "30px", lg: "50px", xl: "100px" }}
            lineHeight={"1.2"}
            mt={{ base: "1rem", md: "0" }}
            ml={{ base: "0.5rem", md: "8.5rem" }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
            maxW={{ base: "100%", md: "900px" }}
          >
            <Typewriter text={header} delay={100} />
          </Heading>
        </Box>
      </Flex>

      <Box
        ml={{ base: "0", md: "45rem" }}
        mr={{ base: "0", md: "2rem" }}
        mb={{ base: "0", md: "2rem" }}
      >
        <Text
          color={"gray.200"}
          // ml={"1.5rem"}
          fontSize={{ base: "15px", md: "10px", lg: "25px", xl: "45px" }}
          mt={{ base: "1rem", md: "0" }}
          mb={{ base: "1rem", md: 0 }}
          ml={{ base: "0.5rem", md: "0" }}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.semibold}
        >
          News
        </Text>
      </Box>
    </Box>
  );
};
