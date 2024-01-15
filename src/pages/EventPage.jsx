import { useContext, useState } from "react";
import React from "react";
import { UserPage } from "./UserPage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Typewriter from "../components/Typewriter";

import { EditEvent } from "../components/form/EditEvent";
import {
  Heading,
  Center,
  Flex,
  Image,
  Text,
  Stack,
  Box,
  Grid,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DataContext from "../components/Root";

export const EventPage = () => {
  const { deleteEvent, header } = useContext(DataContext);

  const { eventId } = useParams();
  const navigate = useNavigate();

  const toast = useToast();

  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Modal pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Toast
  const toastEdit = useToast();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data from user:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);

        //Fetch creator's data by createdBy
        const userResponse = await fetch(
          `http://localhost:3000/users/${eventData.createdBy}`
        );
        const creatorData = await userResponse.json();
        setCreator(creatorData);
      } catch (error) {
        console.error("Error fetching data from event:", error);
      }
    };

    //Fetch categories data
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching data from categories:", error);
      }
    };

    fetchEventData();
    fetchCategories();
  }, [eventId]);

  if (!event || !creator) {
    return <div> Loading event data...</div>;
  }

  //Delete handler and redirect to EventsPage after deleting
  const handleDeleteClick = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          deleteEvent(eventId);
          navigate("/");
          toast({
            title: "Event Deleted",
            description: "The event has been successfully deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "An Error occurred while deleting the event",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

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

  return (
    <Box
      bgColor="gray.900"
      color="whitesmoke"
      minH="100vh"
      paddingTop={"100px"}
    >
      <Heading
        color={"green.200"}
        // ml={"1.5rem"}
        fontSize={{ base: "50px", md: "100px" }}
        lineHeight={"1.2"}
        mt={{ base: "3rem", md: "0" }}
        ml={{ base: "0.9rem", md: "10rem" }}
        fontFamily={orbitronFontFamily}
        fontWeight={orbitronWeight.semibold}
        maxW={{ base: "100%", md: "900px" }}
      >
        <Typewriter text={header} delay={100} />
        {/* Electronic Music <br />
        Events */}
      </Heading>

      <Flex
        align={"center "}
        justify={"center"}
        direction={{ base: "column", md: "row" }} //modifed
        p={8}
      >
        <Box
          mb={{ base: "2rem", md: "0" }}
          position="relative"
          top={{ base: "0", md: "-5rem" }}
          left={{ base: "0", md: "5rem" }}
        >
          {/* modifed from mt={"-15rem"}  👆🏻*/}

          <Center>
            <Heading
              fontSize={{ base: "30px", md: "45px " }} //modifed
              color={"green.200"}
              mb={4}
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.medium}
            >
              {event.title}
            </Heading>
          </Center>

          {/* Edit Event Button to open modal*/}
          <Button
            onClick={openModal}
            bgColor={"gray.900"}
            color={"green.200"}
            mr={6}
            ml={{ base: "2.7rem", md: "0" }} //modifed from {4}
            mb={4} //added
            //shadow
            fontSize={{ base: "0.7rem", md: "" }}
            border="3px solid"
            borderColor={"green.200"}
            boxShadow=" 0px 2px 9px 0px whitesmoke"
            _hover={{
              bgColor: "green.200",
              color: "gray.900",
              boxShadow: "0 0 7px whitesmoke",
            }}
            _active={{ boxShadow: "0px 10px 30px 0px whitesmoke" }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.medium}
          >
            Edit Event
          </Button>

          {/* Modal Form */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit New Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* NewEvent goes here */}
                <EditEvent
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  initialData={{ ...event, eventId: eventId }}
                  //add setEvent to upload the changes on the page
                  setEvent={setEvent}
                  categories={categories}
                  users={users}
                />
              </ModalBody>
              <ModalFooter>
                {/* Additional modal footer actions */}
                <Button onClick={openModal}>Edit Event</Button>
                <Button onClick={closeModal}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Delete Event Button */}
          <Button
            onClick={() => handleDeleteClick(event.id)}
            bgColor={"gray.900"}
            color={"pink.500"}
            deleteEvent={deleteEvent}
            ml={{ base: "2.3rem", md: "0" }} //modifed
            mb={4} //added
            fontSize={{ base: "0.7rem", md: "" }}
            //shadow
            //shadow
            border="1px solid"
            borderColor={"pink.500"}
            boxShadow=" 0px 2px 9px 0px whitesmoke"
            _hover={{
              bgColor: "pink.500",
              color: "gray.900",
              boxShadow: "0 0 7px whitesmoke",
            }}
            _active={{ boxShadow: "0px 10px 30px 0px whitesmoke" }}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.medium}
          >
            Delete Event
          </Button>
        </Box>

        {/* event box */}
        <Flex
          gap={1}
          w={{ base: "full", md: "75%" }}
          flexWrap="wrap"
          flexDir="column"
        >
          <Box
            p={4}
            bgColor={"gray.900"}
            border="1px solid"
            borderColor={"gray.700"}
            w={{ base: "100%", md: "35rem" }} //modifed from  w={"35rem"}
            h={"auto"} //modifed from  h={"45rem"}
            borderRadius={"md"}
            ml={{ base: "0.1rem", md: "0rem", lg: "10rem", xl: "20rem" }}
            mb={{ base: "5rem", md: "10rem" }} //modified
            padding={"2rem"}
          >
            {/* Event image */}
            <Center>
              <Image
                src={event.image}
                alt={event.title}
                borderRadius={"full"}
                mb={4}
                w={{ base: "15rem", md: "20rem" }}
                h={{ base: "10rem", md: "15rem" }}
              />
            </Center>

            {/* Artist Lineup */}
            <Text
              fontSize={"1rem"}
              color={"pink.500"}
              paddingBottom={"0.8rem"}
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.medium}
            >
              Artists:
            </Text>
            <Text
              fontSize={{ base: "0.7rem", md: "0.8rem" }}
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.thin}
              paddingLeft={"2rem"}
              color={"gray.200"}
              paddingBottom={"1rem"}
            >
              {event.lineup}
            </Text>

            {/* Location */}
            <Text
              fontSize={"1rem"}
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.medium}
              color={"pink.500"}
              mt={{ base: "1.5px", md: "3px" }}
            >
              Location
            </Text>
            <Text
              fontSize={{ base: "0.7rem", md: "0.8rem" }}
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.thin}
            >
              {event.location}
            </Text>

            {/* Start Time and End Time */}
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }} //modifed from templateColumns="1fr 1fr"
              gap={8}
              mt={4}
              marginTop={"2.5rem"}
            >
              <Box>
                <Text
                  fontSize={"1rem"}
                  fontFamily={orbitronFontFamily}
                  fontWeight={orbitronWeight.medium}
                  // paddingTop={"1rem"}
                  color={"pink.500"}
                >
                  Start Time:
                </Text>
                <Text
                  fontSize={{ base: "0.7rem", md: "0.8rem" }}
                  fontFamily={robotoSlabFont}
                  fontWeight={robotoSlabWeight.thin}
                >
                  {event.startTime}
                </Text>

                <Text
                  fontSize={"1rem"}
                  // paddingTop={"0.5rem"}
                  fontFamily={orbitronFontFamily}
                  fontWeight={orbitronWeight.medium}
                  color={"pink.500"}
                  mt={{ base: "5px", md: "10px" }}
                >
                  End Time:
                </Text>
                <Text
                  fontSize={{ base: "0.7rem", md: "0.8rem" }}
                  fontFamily={robotoSlabFont}
                  fontWeight={robotoSlabWeight.thin}
                >
                  {event.endTime}
                </Text>
              </Box>

              {/* Render UserPage/creator */}
              <Box
                fontFamily={orbitronFontFamily}
                fontWeight={orbitronWeight.medium}
                fontSize={{ base: "0.9rem", md: "0.8rem" }}
              >
                <UserPage userId={creator.id} />
              </Box>
            </Grid>

            {/* Description */}
            <Center>
              <Text
                fontSize={{ base: "0.7rem", md: "0.8rem" }}
                color={"teal.300"}
                mb={"0.5rem"}
                fontFamily={orbitronFontFamily}
                fontWeight={orbitronWeight.medium}
              >
                {event.description}
              </Text>
            </Center>

            {/* //categories */}
            <Center>
              <Stack direction={"row"} mt={2}>
                {/* checks  if it is indeed an array */}
                {Array.isArray(event.categoryIds) ? (
                  event.categoryIds.map((categoryId) => {
                    const category = categories.find(
                      (category) => category.id === categoryId
                    );
                    console.log("category:", category);
                    if (!category) return null;

                    return (
                      <Text
                        key={category.id}
                        color="yellow.300"
                        fontSize={{ base: "0.8rem", md: "1rem" }}
                        mr={2}
                        fontFamily={orbitronFontFamily}
                        fontWeight={orbitronWeight.light}
                      >
                        {category.name}
                      </Text>
                    );
                  })
                ) : (
                  <Text>No categories available</Text>
                )}
              </Stack>
            </Center>
          </Box>
        </Flex>
      </Flex>
      <Center></Center>
    </Box>
  );
};
