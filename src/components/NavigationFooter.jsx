import { React } from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";

export const NavigationFooter = () => {
  return (
    <Box
      borderTop={"4px"}
      borderColor="gray.700"
      h={100}
      bgColor={"gray.900"}
      color={"whitesmoke"}
      textAlign={"center"}
      fontSize={"sm"}
    >
      <Flex justify={"center"}>
        <Text mr={"5rem"}>About Us</Text>
        <Text mr={"5rem"}>Media</Text>
        <Text mr={"5rem"}>Contact</Text>
        <Text> ©XaglyMontilva 2023</Text>
      </Flex>
    </Box>
  );
};
