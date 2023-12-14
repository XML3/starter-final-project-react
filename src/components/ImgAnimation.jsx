import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Box } from "@chakra-ui/react";
import snap from "../img/path13.png";
import { useInView } from "react-intersection-observer";

const ImgAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fastSpin = {
      rotateY: 360 * 10, // Adjust the multiplier for the initial fast spin
      transition: {
        loop: Infinity,
        duration: 2, // Adjust the duration of the fast spin
        ease: "easeInOut", // Custom easing function for fast spin
      },
    };

    const slowSpin = {
      rotateY: 360,
      transition: {
        loop: 5,
        duration: 2, // Adjust the duration of the slow spin
        ease: "easeOut", // Custom easing function for slow spin
      },
    };

    if (inView) {
      if (!isAnimating) {
        setIsAnimating(true);

        // Start with the fast spin and smoothly transition to the slow spin
        controls.start(fastSpin).then(() => {
          controls.start(slowSpin);
        });
      }
    } else {
      setIsAnimating(false);
      controls.stop();
    }
  }, [inView, controls, isAnimating]);

  return (
    <Box
      ref={ref}
      w={{ base: "100%", md: "30%" }}
      h="auto"
      overflow="hidden"
      mb={{ base: "2rem", md: "0" }}
      mt={{ base: "3rem", md: "4rem" }}
    >
      <motion.img
        src={snap}
        alt="animatedImage"
        style={{
          width: "100%",
          height: "auto%",
        }}
        animate={controls}
      />
    </Box>
  );
};

export default ImgAnimation;
