import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";
import NewEvent from "../components/form/NewEvent";
import { SearchItem } from "../components/SearchItem";

import {
  Heading,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useBreakpointValue,
  Button,
  useToast,
} from "@chakra-ui/react";

export const loader = async () => {
  const eventsResponse = await fetch("http://localhost:3000/events");
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { events, categories };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEventAdded = async (newEventData) => {
    const newEventResponse = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEventData),
    });

    if (newEventResponse.ok) {
      const updatedEventsResponse = await fetch("http://localhost:3000/events");
      setFilteredEvents(await updatedEventsResponse.json());

      toast({
        title: "Event Created",
        description: "Your event has been successfuly created!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create new event. Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //Filtered events : SearchItem

  const handleFilteredEvents = (searchValue) => {
    if (searchValue === "") {
      setFilteredEvents(events);
    } else {
      const matchedEvents = events.filter((event) => {
        const { location, title } = event;
        return (
          location.toLowerCase().includes(searchValue.toLowerCase()) ||
          title.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFilteredEvents(matchedEvents);
    }
  };

  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 2 });

  return (
    <>
      <Box bgColor="gray.900" color="whitesmoke" minH="100vh">
        <Heading color={"green.200"} ml={"1.5rem"} fontSize={"200px"}>
          Electronic Music Events
        </Heading>

        <Flex align="center" justify="center" minH="100vh">
          <Image
            h="30rem"
            w="45rem"
            mr={90}
            ml={"3rem"}
            src="/src/img/path13.png"
            alt="geometrical pattern"
          />

          <div className="events-page">
            <Text fontSize={"2rem"} color={"yellow.200"}>
              Search Events:
              <SearchItem
                events={events}
                handleFilteredEvents={handleFilteredEvents}
              />
            </Text>
            {/* Modal Form */}
            <Button
              onClick={openModal}
              bgColor={"green.200"}
              color={"gray.900"}
              mb={10}
            >
              {" "}
              Add New Event
            </Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create New Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* NewEvent goes here */}
                  <NewEvent
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onEventAdded={handleEventAdded}
                    categories={categories}
                  />
                </ModalBody>
                <ModalFooter>
                  {/* Additional modal footer actions go here  */}

                  <Button onClick={closeModal}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Box with Cards */}
            <Box
              p={4}
              bgColor={"gray.500"}
              w={"35rem"}
              h={"40rem"}
              borderRadius={"md"}
              mr={"2rem"}
              mb={"3rem"}
              padding={"2rem"}
              overflowY="scroll"
            >
              <Flex align={"center"} justify={"center"}>
                <SimpleGrid columns={columns} gap={8}>
                  {/* //map through filtered events/+ Search functionality */}
                  {filteredEvents.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id}>
                      <EventsCard
                        key={event.id}
                        event={event}
                        categories={categories}
                      />
                    </Link>
                  ))}
                </SimpleGrid>
              </Flex>
            </Box>
          </div>
        </Flex>
      </Box>
    </>
  );
};
