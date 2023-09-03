import { React } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

export const NavigationFooter = () => {
  return (
    <Box h={10} bgColor={"gray.700"} color={"whitesmoke"} textAlign={"center"}>
      <Flex justify={"center"}>
        <Text>
          This App and its content is fictional, none of these events are real,
          however the artists names are 100% real. This page was programmed and
          designed, including graphics and images, by:
        </Text>
        <Text> ©XaglyMontilva 2023</Text>
      </Flex>
    </Box>
  );
};
