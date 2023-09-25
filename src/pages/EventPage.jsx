import { useState } from "react";
import React from "react";
import { UserPage } from "./UserPage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

export const EventPage = () => {
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
        const response = await fetch(`http:/localhost:3000/events/${eventId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          navigate("/events");
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

  return (
    <Box bgColor="gray.900" color="whitesmoke" minH="100vh">
      <Center>
        <Heading color={"green.200"} ml={"1.5rem"} fontSize={"200px"}>
          Electronic Music Events
        </Heading>
      </Center>

      <Flex align={"center "} justify={"space-around"} p={6}>
        <Box>
          <Heading fontSize={"100px"} color={"pink.500"} mb={4}>
            {event.title}
          </Heading>

          {/* Edit Event Button to open modal*/}
          <Button
            onClick={openModal}
            bgColor={"green.300"}
            color={"gray.900"}
            mr={6}
            ml={4}
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
                  categories={categories}
                  users={users}
                />
              </ModalBody>
              <ModalFooter>
                {/* Additional modal footer actions go here  */}
                <Button onClick={openModal}>Edit Event</Button>
                <Button onClick={closeModal}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Delete Event Button */}
          <Button
            onClick={() => handleDeleteClick(event.id)}
            bgColor={"pink.500"}
            color={"gray.900"}
          >
            Delete Event
          </Button>
        </Box>

        {/* event box */}
        <Flex gap={1} w={["full", "75%"]} flexWrap="wrap" flexDir="column">
          <Box
            p={4}
            bgColor={"gray.800"}
            w={"35rem"}
            h={"45rem"}
            borderRadius={"md"}
            ml={"20rem"}
            padding={"2rem"}
          >
            {/* Event image */}
            <Center>
              <Image
                src={event.image}
                alt={event.title}
                borderRadius={"md"}
                mb={4}
                w="20rem"
                h="15rem"
              />
            </Center>

            {/* Artist Lineup */}
            <Text
              fontSize={"1rem"}
              fontWeight={"bold"}
              color={"pink.500"}
              paddingBottom={"0.8rem"}
            >
              Artists:
            </Text>
            <Text
              fontSize={"0.8rem"}
              paddingLeft={"2rem"}
              color={"teal.300"}
              paddingBottom={"1rem"}
            >
              {event.lineup}
            </Text>

            {/* Location */}
            <Text
              fontSize={"1rem"}
              fontWeight={"bold"}
              color={"pink.500"}
              paddingBottom={"0.5rem"}
            >
              Location
            </Text>
            <Text fontSize={"sm"}>{event.location}</Text>

            {/* Start Time and End Time */}
            <Grid templateColumns="1fr 1fr" gap={8} mt={4} marginTop={"2.5rem"}>
              <Box>
                <Text
                  fontSize={"1rem"}
                  // paddingTop={"1rem"}
                  fontWeight={"bold"}
                  color={"pink.500"}
                >
                  Start Time:
                </Text>
                <Text fontSize={"2xs"}>{event.startTime}</Text>

                <Text
                  fontSize={"1rem"}
                  // paddingTop={"0.5rem"}
                  fontWeight={"bold"}
                  color={"pink.500"}
                >
                  End Time:
                </Text>
                <Text fontSize={"2xs"}>{event.endTime}</Text>
              </Box>

              {/* Render UserPage/creator */}
              <Box>
                <UserPage userId={creator.id} />
              </Box>
            </Grid>

            {/* Description */}
            <Text fontSize={"sm"} color={"green.200"} mb={"1rem"}>
              {event.description}
            </Text>

            {/* //categories */}
            <Center>
              <Stack direction={"row"} mt={4}>
                {event.categoryIds &&
                  event.categoryIds.map((categoryId) => {
                    const category = categories.find(
                      (category) => category.id === categoryId
                    );
                    if (!category) return null;
                    //console.log("events categories", event.categories);
                    // console.log("categories:", categories);
                    return (
                      <Text
                        key={category.id}
                        color="yellow.300"
                        fontSize={"sm"}
                        fontWeight={"medium"}
                        mr={2}
                      >
                        {category.name}
                      </Text>
                    );
                  })}
              </Stack>
            </Center>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
