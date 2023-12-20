import { React } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Flex, Image, Grid } from "@chakra-ui/react";

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
      h={{ base: "22vh", md: "20vh" }}
      bgColor={"gray.900"}
      color={"whitesmoke"}
      textAlign={"center"}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justify={"center"}
        align={{ base: "start", md: "center" }}
        fontSize={{ base: "0.5em", md: "0.7em" }}
        mt={{ base: "10px", md: "30px" }}
        ml={{ base: "10px", md: 0 }}
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

      {/* ICONS */}
      <Flex
        direction={{ base: "row", md: "row" }}
        justify={{ base: "center", md: "space-around" }}
        alignItems={{ base: "start", md: "center" }}
        mt={{ base: "5px", md: "30px" }}
        mb={{ base: "10px", md: "20px" }}
        mr={{ base: "5px", md: "40rem" }}
        ml={{ base: "5px", md: "40rem" }}
      >
        <Image
          src="../src/icons/x_social_media_pink_icon3.png"
          alt="social media X icon"
          objectFit="scale-down"
          boxSize={{ base: "20px", md: "30px" }}
        />

        <Image
          src="../src/icons/meta_pink_icon3.png"
          alt="social media X icon"
          objectFit="scale-down"
          boxSize={{ base: "20px", md: "30px" }}
        />

        <Image
          src="../src/icons/pink_instagram3_icon.png"
          alt="social media X icon"
          objectFit="scale-down"
          boxSize={{ base: "20px", md: "30px" }}
        />

        <Image
          src="../src/icons/threads_pink_icon.png"
          alt="social media X icon"
          objectFit="scale-down"
          boxSize={{ base: "20px", md: "30px" }}
        />

        <Image
          src="../src/icons/tiktok_pink_icon.png"
          alt="social media X icon"
          objectFit="scale-down"
          boxSize={{ base: "20px", md: "30px" }}
        />
      </Flex>

      {/* MY LOGO + COPYRIGHT */}
      <Flex
        direction={{ base: "row", md: "row" }}
        justify={{ base: "center", md: "center" }}
        align={{ base: "start", md: "center" }}
        mt={{ base: "5px", md: "10px" }}
        mr={{ base: "10px", md: "2rem" }}
        ml={{ base: "10px", md: 0 }}
        fontSize={{ base: "0.5em", md: "0.7em" }}
      >
        <Box>
          <Image
            src="../src/img/xagly_logo_nobg.png"
            boxSize="30px"
            objectFit="scale-down"
            borderRadius="full"
          />
        </Box>

        {/* COPYRIGHT */}

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
