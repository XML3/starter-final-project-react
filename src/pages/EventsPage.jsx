import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";
import NewEvent from "../components/form/NewEvent";
import { SearchItem } from "../components/SearchItem";
import DataContext from "../components/Root";
import ImgAnimation from "../components/ImgAnimation";

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
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Button,
  Center,
} from "@chakra-ui/react";
import ImgLoop from "../components/ImgLoop";

export const EventsPage = () => {
  const {
    events,
    handleEventAdded,
    handleFilteredEvents,
    categories,
    filteredEvents,
    users,
  } = useContext(DataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <>
      <Box bgColor="gray.900" color="whitesmoke" minH="100vh">
        <Flex
          align={{ base: "center", md: "flex-start" }}
          justify={"center"}
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
        >
          <Box ml={{ base: "0", md: "1.5rem" }} mr={{ base: "0", md: "11rem" }}>
            <Heading
              color={"green.200"}
              // ml={"1.5rem"}
              fontSize={{ base: "100px", md: "130px" }}
              lineHeight={"1.2"}
              mt={{ base: "1rem", md: "0" }}
              ml={{ base: "0.5rem", md: "0" }}
            >
              Electronic Music <br />
              Events
            </Heading>
            {/* </Flex> */}
            {/* <Flex wrap={"wrap"} justify="center" minH="2vh" maxW={"40rem"}> */}
            {/* <Box mt={"3rem"}> */}

            <Text
              color={"gray.300"}
              ml={{ base: "0.5rem", md: "0.5rem" }}
              fontSize={{ base: "18px", md: "20px" }}
              mt={{ base: "1rem", md: "1rem" }}
              maxW={{ base: "100%", md: "45rem" }}
              marginBottom={{ base: "2rem", md: "0" }}
            >
              We aim to provide information on Electronic Music Events in your
              area by offering our service to all promoters for different types
              of venues and size events in all corners of the world to enrich
              human lives through movement and sound.
            </Text>
          </Box>
          <ImgAnimation />
        </Flex>
        {/* 
        <Center>
          <ImgLoop />
        </Center> */}

        <Flex align="center" justify="center" minH="100vh">
          <div className="events-page">
            {/* <Text fontSize={"1.5rem"} color={"yellow.200"}>
              Search Events:
              <SearchItem
                events={events}
                handleFilteredEvents={handleFilteredEvents}
              />
            </Text> */}
            {/* Modal Form */}
            <Button
              onClick={openModal}
              bgColor={"green.200"}
              color={"gray.900"}
              ml={{ base: "6rem", md: "5rem" }}
              mb={{ base: "2rem", md: "5rem" }}
              mt={{ base: "2rem", md: "-40rem" }}
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
                    users={users}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* Box with Cards */}
            <Box
              p={4}
              bgColor={"gray.500"}
              w={"100wh"}
              h={"100vh"}
              borderRadius={"md"}
              mr={"2rem"}
              mb={"3rem"}
              padding={"2rem"}
              overflowY="scroll"
              position={"relative"}
              mt={{ base: "2rem", md: "-20rem" }}
            >
              {/* Search Event Input */}
              <Box
                position={"sticky"}
                top={0}
                right={0}
                mt={4}
                mr={4}
                zIndex={1}
                p={4}
              >
                <Text fontSize={"1.5rem"} color={"yellow.200"}>
                  Search Events:
                  <SearchItem
                    events={events}
                    handleFilteredEvents={handleFilteredEvents}
                  />
                </Text>
              </Box>

              {/* Events Cards */}
              <Flex align={"center"} justify={"center"}>
                <SimpleGrid columns={columns} gap={8}>
                  {/* //map through filtered events/+ Search functionality - Root component/ SeearchItem component*/}
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
