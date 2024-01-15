import { delay } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

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

  //Typing logic
  return (
    <span
    //   fontFamily={orbitronFontFamily}
    //   fontWeight={orbitronWeight.semibold}
    //   color={"green.200"}
    //   fontSize={{ base: "24px", md: "50px", lg: "80px", xl: "100px" }}
    //   lineHeight={"1.2"}
    //   mt={{ base: "1rem", md: "0" }}
    //   ml={{ base: "0.5rem", md: "0" }}
    //   maxW={{ base: "100%", md: "900px" }}
    >
      {currentText}
    </span>
  );
};

export default Typewriter;
