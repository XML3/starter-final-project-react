import React from "react";
import { useState, useContext } from "react";
import DataContext from "../components/Root";
import Typewriter from "../components/Typewriter";
import {
  Box,
  Center,
  Heading,
  Flex,
  Image,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
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
  const { header } = useContext(DataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toast = useToast();

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
        // console.log("From submitted successfully");
        toast({
          title: "Form Submitted",
          description: "Form successfully submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        //console.log("Error submitting form");
        toast({
          title: "Error",
          description: "An Error has occcurred while submitting the form",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
        <Box
          ml={{ base: "0", md: "1.5rem" }}
          mr={{ base: "0", md: "2rem" }}
          mb={{ base: "0", md: "5rem" }}
        >
          <Heading
            color={"green.200"}
            // ml={"1.5rem"}
            fontSize={{ base: "24px", md: "30px", lg: "50px", xl: "100px" }}
            lineHeight={"1.2"}
            mt={{ base: "1rem", md: "0" }}
            ml={{ base: "0.5rem", md: "8.5rem" }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.semibold}
            maxW={{ base: "100%", md: "900px" }}
          >
            <Typewriter text={header} delay={100} />
          </Heading>
        </Box>
      </Flex>

      <Box
        ml={{ base: "0", md: "45rem" }}
        mr={{ base: "0", md: "2rem" }}
        mb={{ base: "0", md: "2rem" }}
      >
        <Text
          color={"gray.200"}
          // ml={"1.5rem"}
          fontSize={{ base: "15px", md: "10px", lg: "25px", xl: "25px" }}
          mt={{ base: "1rem", md: "0" }}
          mb={{ base: "1rem", md: 0 }}
          ml={{ base: "0.5rem", md: "0" }}
          fontFamily={orbitronFontFamily}
          fontWeight={orbitronWeight.semibold}
        >
          Contact
        </Text>
      </Box>

      <Center>
        <Box
          bgColor="gray.900"
          color="whitesmoke"
          // mx={"auto"}
          // p={4}
          border="1px solid"
          borderColor={"gray.700"}
          w={{ base: "90%", md: "50%" }}
          // h={{ base: "100%", md: "50vh" }}
          padding={{ base: "1rem", md: "5rem" }}
          mb={"5rem"}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-start" }}
            wrap={"wrap"}
          >
            <Image
              src="../src/img/xagly_logo_nobg_dark2.png"
              alt="personal logo in pink"
              marginRight={{ base: "0", md: "10rem" }}
              position={"relative"}
              top={{ base: "0.5", md: "5rem" }}
              objectFit={{ base: "contain", md: "contain" }}
              size={{ base: "40px", md: "200px" }}
              maxW={{ base: "20%", md: "50%" }}
            />
            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <FormControl
                id="name"
                mt={"1rem"}
                w={{ base: "12rem", md: "20rem" }}
                isRequired
              >
                <FormLabel
                  fontFamily={robotoSlabFont}
                  fontWeight={robotoSlabWeight.regular}
                >
                  Name
                </FormLabel>
                <Input
                  placeholder="Full Name"
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
                  placeholder="Email"
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
                  placeholder="Write us a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  focusBorderColor="pink.500"
                  style={{
                    borderColor: isMessageError ? "red.500" : "inherit",
                  }}
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
                fontSize={{ base: "0.8rem", md: "0.8rem" }}
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
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default ContactForm;
