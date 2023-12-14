import { Link } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box
      borderBottom={"4px"}
      borderColor="gray.700"
      bgColor={"gray.900"}
      align={"right"}
      p={4}
    >
      <Flex justify={"flex-end"}>
        <Heading color={"pink.500"} size="md" mr={8}>
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
