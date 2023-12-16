import { React } from "react";
import { Box, Text, Flex, Center, Image } from "@chakra-ui/react";

export const NavigationFooter = () => {
  return (
    <Box
      borderTop={"2px"}
      borderColor="gray.700"
      h={"10vh"}
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
        <Text mr={"5rem"}>About Us</Text>
        <Text mr={"5rem"}>Media</Text>
        <Text mr={"5rem"}>Contact</Text>
        <Text mr={"5rem"}>Bussiness B.V</Text>
        <Text mr={"5rem"}>FAQ/Help</Text>
        <Text mr={"5rem"}>Privacy Policy</Text>
        <Text mr={"5rem"}>Careers</Text>
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
              src="../src/img/new_x_logo.png"
              boxSize="50px"
              objectFit="cover"
              borderRadius="full"
            />
          </Flex>
        </Box>
        <Text>
          ©2023 XaglyMontilva.All Rights Reserved.Logos and images are property
          of Xagly Montilva
        </Text>
      </Flex>
    </Box>
  );
};
