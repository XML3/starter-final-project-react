import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";
import NewEvent from "../components/form/NewEvent";
import { SearchItem } from "../components/SearchItem";
import DataContext from "../components/Root";

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
} from "@chakra-ui/react";

export const EventsPage = () => {
  const {
    events,
    handleEventAdded,
    handleFilteredEvents,
    categories,
    filteredEvents,
  } = useContext(DataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
