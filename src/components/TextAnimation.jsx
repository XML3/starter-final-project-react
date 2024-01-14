// Create a new component for looping images
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { InView, useInView } from "react-intersection-observer";
import { Text, Flex, Center } from "@chakra-ui/react";

const TextAnimation = () => {
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

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 30,
        transition: {
          duration: 2,
          delay: 1,
        },
      });
    }
  }, [controls, inView]);

  const textStyle = {
    fontFamily: orbitronFontFamily,
    fontWeight: orbitronWeight.semibold,
    color: "gray.300",
  };

  return (
    <Center minH="20vh" mt={{ base: "3rem", md: "-10rem" }}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="20vh"
        wrap="wrap"
        mt={{ base: "3rem", md: "-10rem" }}
      >
        <motion.div
          initial={{ x: -3000 }}
          animate={{ x: 30 }}
          transition={{
            duration: "2",
            delay: "0.8",
          }}
          style={textStyle}
        >
          <Text
            fontSize={{ base: "20px", md: "30px", lg: "40px", xl: "50px" }}
            textAlign="center"
            paddingBottom={2.5}
          >
            Experience the Power of
          </Text>
        </motion.div>

        <motion.div
          initial={{ x: -3000 }}
          animate={{ x: 30 }}
          transition={{
            duration: "2",
            delay: "1",
          }}
          style={textStyle}
        >
          <Text
            fontSize={{ base: "20px", md: "30px", lg: "40px", xl: "50px" }}
            textAlign="center"
          >
            of movement and sound
          </Text>
        </motion.div>
      </Flex>
    </Center>
  );
};

export default TextAnimation;
