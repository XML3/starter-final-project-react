import { Link } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";

export const Navigation = () => {
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
        <Heading
          color="pink.500"
          size="md"
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 8 }}
        >
          <Link to="/">Home</Link>
        </Heading>

        <Link to="/event/1">
          <Heading color={"pink.500"} size="md" mr={8}>
            Event
          </Heading>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navigation;
