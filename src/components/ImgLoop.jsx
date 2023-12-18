// Create a new component for looping images
import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Import your looping images
//import broken_circle_yellow from "../img/broken_circle_yellow.png";
//import Drun_n_bass from "../img/Drun_n_bass.png";
import new_x_logo from "../img/new_x_logo.png";

const ImgLoop = () => {
  const images = [new_x_logo];

  return (
    <Box mt={4}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "1000px", // Adjust the height as needed
          }}
          animate={{ x: [0, -10, 0], y: [0, -10, -0] }} // Adjust animation as needed
          transition={{ repeat: Infinity, duration: 5 }}
        />
      ))}
    </Box>
  );
};

export default ImgLoop;
