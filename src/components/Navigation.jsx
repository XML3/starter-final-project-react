import { Link } from "react-router-dom";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

export const Navigation = () => {
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
      borderBottom={"2px"}
      borderColor="gray.700"
      bgColor={"gray.900"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000} // Set a high zIndex to ensure it stays on top
      // align={"right"}
      p={4}
    >
      <Flex
        direction={{ base: "2 column", md: "row" }}
        wrap={"wrap"}
        justify={{ base: "center", md: "start" }}
        align={{ base: "start", md: "center" }}
      >
        {/* LOGO Section */}
        <Box mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 450 }}>
          <Image
            src="./src/img/xagly_logo_nobg.png"
            boxSize="40px"
            objectFit="scale-down"
            alt="logo"
          />
        </Box>

        {/* Menu Section  */}

        <Text
          color="gray.200"
          fontSize={16}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 20 }}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.semibold}
        >
          <Link to="/">Home</Link>
        </Text>

        <Link to="/event/1">
          <Text
            color={"gray.200"}
            fontSize={16}
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 20 }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Event
          </Text>
        </Link>

        <Link to="/about">
          <Text
            color={"gray.200"}
            fontSize={16}
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 20 }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            About
          </Text>
        </Link>

        <Link to="/contact">
          <Text
            color={"gray.200"}
            fontSize={16}
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 20 }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Contact
          </Text>
        </Link>

        <Link to="/careers">
          <Text
            color={"gray.200"}
            fontSize={16}
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 20 }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Career
          </Text>
        </Link>

        <Text
          color={"gray.200"}
          fontSize={16}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 20 }}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.semibold}
        >
          News
        </Text>
      </Flex>
    </Box>
  );
};

export default Navigation;
