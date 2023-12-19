import { React } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

export const NavigationFooter = () => {
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

  return (
    <Box
      borderTop={"2px"}
      borderColor="gray.700"
      h={"20vh"}
      bgColor={"gray.900"}
      color={"whitesmoke"}
      textAlign={"center"}
    >
      <Flex
        direction={{ base: "2 column", md: "row" }}
        wrap="wrap"
        justify={"center"}
        align={{ base: "start", md: "center" }}
        fontSize={{ base: "0.5em", md: "0.7em" }}
        paddingTop={"10px"}
      >
        <Link to="/about">
          <Text
            mr={"5rem"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.normal}
          >
            About Us
          </Text>
        </Link>

        <Text
          mr={"5rem"}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.normal}
        >
          Media
        </Text>

        <Link to="/contact">
          <Text
            mr={"5rem"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.normal}
          >
            Contact
          </Text>
        </Link>

        <Text
          mr={"5rem"}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.normal}
        >
          Bussiness B.V
        </Text>
        <Text
          mr={"5rem"}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.normal}
        >
          FAQ/Help
        </Text>
        <Text
          mr={"5rem"}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.normal}
        >
          Privacy Policy
        </Text>
        <Link to="/careers">
          <Text
            mr={"5rem"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.normal}
          >
            Careers
          </Text>
        </Link>
      </Flex>

      <Flex
        direction={{ base: "2 column", md: "row" }}
        wrap="wrap"
        justify={{ base: "center", md: "center" }}
        align={{ base: "start", md: "center" }}
        mt={"10px"}
        mr={{ base: "0", md: "2rem" }}
        fontSize={{ base: "0.5em", md: "0.7em" }}
      >
        <Box>
          <Flex justify={"flex-end"}>
            <Image
              src="../src/img/xagly_logo_nobg.png"
              boxSize="30px"
              objectFit="scale-down"
              borderRadius="full"
            />
          </Flex>
        </Box>
        <Text
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.normal}
        >
          ©2023 XaglyMontilva.All Rights Reserved. Logos, graphics and images
          are property of Xagly Montilva
        </Text>
      </Flex>
    </Box>
  );
};
