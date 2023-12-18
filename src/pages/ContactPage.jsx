import React from "react";
import { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Flex,
  Image,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

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

//FONT ROBOTO SLAB
const robotoSlabFont = "Roboto Slab, serif";
const robotoSlabWeight = {
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
  },
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isNameError = isSubmitted && name === "";
  const isEmailError = isSubmitted && email === "";
  const isMessageError = isSubmitted && message === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    //Check for error when form is submitted
    if (isNameError || isEmailError || isMessageError) {
      console.log("An error has occured.  Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        console.log("From submitted successfully");
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box bgColor="gray.900" minH="100vh" paddingTop={"100px"}>
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
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
          >
            Contact Us
          </Heading>
        </Box>
      </Flex>

      <Box bgColor="gray.900" color="whitesmoke" maxW="xl" mx={"auto"} p={4}>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <FormControl id="name" mt={"1rem"} isRequired>
            <FormLabel
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.regular}
            >
              Name
            </FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="pink.500"
              style={{ borderColor: isNameError ? "red.500" : "inherit" }}
            />
            {isNameError && (
              <FormErrorMessage>Name is required</FormErrorMessage>
            )}
          </FormControl>

          {/* EMAIL */}
          <FormControl id="email" isInvalid={isEmailError} isRequired>
            <FormLabel
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.regular}
              mt={"1rem"}
            >
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="pink.500"
              style={{ borderColor: isEmailError ? "red.500" : "inherit" }}
            />
            {isEmailError && (
              <FormErrorMessage>Email is required</FormErrorMessage>
            )}
          </FormControl>

          {/* MESSAGE */}
          <FormControl id="message" isRequired>
            <FormLabel
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.regular}
              mt={"1rem"}
            >
              Message
            </FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              focusBorderColor="pink.500"
              style={{ borderColor: isMessageError ? "red.500" : "inherit" }}
            />
            {isMessageError && (
              <FormErrorMessage>Message is required</FormErrorMessage>
            )}
          </FormControl>

          {/* BUTTON */}
          <Button
            type="submit"
            bgColor={"gray.900"}
            color={"green.200"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.medium}
            mt={"2rem"}
            //shadow
            border="1px solid"
            borderColor={"green.200"}
            boxShadow=" 0px 2px 9px 0px whitesmoke"
            _hover={{
              bgColor: "green.200",
              color: "gray.900",
              boxShadow: "0 0 7px whitesmoke",
            }}
            _active={{ boxShadow: "0px 10px 30px 0px whitesmoke" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
