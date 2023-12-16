import React from "react";
import { Image, Center, Box, Flex, Heading, Text } from "@chakra-ui/react";

export const AboutPage = () => {
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
        <Box ml={{ base: "0", md: "1.5rem" }} mr={{ base: "0", md: "2rem" }}>
          <Heading
            color={"green.200"}
            // ml={"1.5rem"}
            fontSize={{ base: "24px", md: "50px", lg: "80px", xl: "130px" }}
            lineHeight={"1.2"}
            mt={{ base: "1rem", md: "0" }}
            ml={{ base: "0.5rem", md: "0" }}
          >
            About Us
          </Heading>
        </Box>
      </Flex>

      <Center>
        <Box
          backgroundColor={"gray.900"}
          border="1px solid"
          borderColor={"gray.700"}
          w={{ base: "90%", md: "75%" }}
          // h={{ base: "100%", md: "50vh" }}
          padding={{ base: "0.6rem", md: "2rem" }}
          marginTop={"1rem"}
          marginBottom={"5rem"}
          color={"gray.300"}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-start" }}
            wrap={"wrap"}
          >
            <Text
              ffontSize={{ base: "0.8rem", md: "sm" }}
              marginLeft={{ base: "0", md: "1rem" }}
              flex="1"
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
              imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
              ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
              tellus eget condimentum rhoncus, sem quam semper libero, sit amet
              adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
              pulvinar, hendrerit id, lorem.
            </Text>
            <Image
              src="./src/img/on-blog.png"
              w={{ base: "100%", md: "50%" }}
              h={{ base: "auto", md: "auto" }}
              marginBottom={{ base: "1rem", md: "0" }}
            />
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default AboutPage;