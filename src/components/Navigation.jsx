import { Link } from "react-router-dom";
import { Box, Heading, Flex, Image } from "@chakra-ui/react";

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
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
      >
        <Image
          src="./src/img/xagly_logo_nobg.png"
          boxSize="40px"
          objectFit="scale-down"
          alt="logo"
        />
        <Heading
          color="gray.200"
          size="sm"
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 8 }}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.semibold}
        >
          <Link to="/">Home</Link>
        </Heading>

        <Link to="/event/1">
          <Heading
            color={"gray.200"}
            size="sm"
            mr={8}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Event
          </Heading>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navigation;
