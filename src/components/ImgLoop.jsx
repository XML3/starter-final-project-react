// Create a new component for looping images
import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Import your looping images
// import fest1 from "../img/fest1.jpg";
// import fest2 from "../img/fest2.jpg";
// import festGirl from "../img/festGirl.jpg";
// import fest3 from "../img/fest3.jpg";
// import fest4 from "../img/fest4.jpg";
// import fest5 from "../img/fest5.jpg";
// import fest6 from "../img/fest6.jpg";

const Paths = ["../img/fest1.jpg"];
const ImgLoop = () => {
  //   const images = [fest1, fest2, festGirl, fest3, fest4, fest5, fest6];

  return (
    <Box mt={4}>
      {Paths.map((image, index) => (
        <motion.div
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "200px", // Adjust the height as needed
          }}
          animate={{ x: [0, -100, 0], y: [0, -100, 0] }} // Adjust animation as needed
          transition={{ repeat: Infinity, duration: 5 }}
        />
      ))}
    </Box>
  );
};

export default ImgLoop;
