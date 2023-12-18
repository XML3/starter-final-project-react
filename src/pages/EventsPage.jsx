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

export const EventsPage = () => {
  const {
    events,
    handleEventAdded,
    handleFilteredEvents,
    categories,
    filteredEvents,
    users,
  } = useContext(DataContext);

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
  //FONT ROBOT SLAB
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
      <Box
        bgColor="gray.900"
        color="whitesmoke"
        minH="100vh"
        paddingTop={"100px"}
      >
        <Flex
          align={{ base: "center", md: "flex-start" }}
          justify={"center"}
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
        >
          <Box ml={{ base: "0", md: "1.5rem" }} mr={{ base: "0", md: "2rem" }}>
            <Heading
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.semibold}
              color={"green.200"}
              // ml={"1.5rem"}
              fontSize={{ base: "24px", md: "50px", lg: "80px", xl: "120px" }}
              lineHeight={"1.2"}
              mt={{ base: "1rem", md: "0" }}
              ml={{ base: "0.5rem", md: "0" }}
            >
              Electronic Music <br />
              Events
            </Heading>

            <Text
              color={"gray.300"}
              ml={{ base: "0.5rem", md: "0.5rem" }}
              fontSize={{ base: "18px", md: "20px" }}
              mt={{ base: "1rem", md: "1rem" }}
              maxW={{ base: "100%", md: "45rem" }}
              marginBottom={{ base: "2rem", md: "0" }}
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.light}
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

        {/* This Flex manages the whole Cards Box */}
        <Flex align="center" justify="center" minH="100vh">
          <div className="events-page">
            {/* Modal Form */}
            <Button
              onClick={openModal}
              bgColor={"gray.900"}
              color={"green.200"}
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.medium}
              ml={{ base: "6rem", md: "55rem" }}
              mb={{ base: "2rem", md: "5rem" }}
              mt={{ base: "2rem", md: "-40rem" }}
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
              {" "}
              Create Event
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
              bgColor={"gray.800"}
              w={"100%"}
              h={"100vh"}
              borderRadius={"md"}
              mr={"2rem"}
              mb={"1rem"}
              padding={"2rem"}
              overflowY="scroll"
              position={"relative"}
              mt={{ base: "2rem", md: "-20rem" }}
            >
              {/* search box fixed*/}
              <Box
                position={"sticky"}
                backgroundColor={"gray.800"}
                top={-8}
                right={0}
                mt={-6}
                mr={0}
                zIndex={1}
                p={1}
              >
                {/* Search Event Input */}
                <Flex align={"flex-start"} justify={"flex-start"}>
                  <Box
                  // position={"sticky"}
                  // top={-5}
                  // right={0}
                  // mt={-6}
                  // mr={0}
                  // zIndex={1}
                  // p={1}
                  >
                    <Text
                      fontFamily={orbitronFontFamily}
                      fontWeight={orbitronWeight.medium}
                      fontSize={"1rem"}
                      color={"yellow.200"}
                    >
                      Search Events:
                      <SearchItem
                        events={events}
                        handleFilteredEvents={handleFilteredEvents}
                      />
                    </Text>
                  </Box>
                </Flex>
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

        {/* Middle of the page TEXT */}
        <Center minH="50vh">
          <Box>
            <Flex
              direction="column"
              align={{ base: "center", md: "center" }}
              justify="center"
              wrap="wrap"
            >
              <Text
                fontFamily={orbitronFontFamily}
                fontWeight={orbitronWeight.semibold}
                fontSize={{ base: "20px", md: "30px", lg: "40px", xl: "60px" }}
                textAlign="center"
                marginBottom="1rem"
                color="gray.300"
              >
                Experience the power of
              </Text>
              <Text
                fontFamily={orbitronFontFamily}
                fontWeight={orbitronWeight.semibold}
                fontSize={{ base: "20px", md: "30px", lg: "40px", xl: "60px" }}
                textAlign="center"
                marginBottom="7rem"
                color="gray.300"
              >
                movement and sound
              </Text>
            </Flex>
          </Box>
        </Center>

        {/* Here starts the bottom section with Text and images  */}
        <Center>
          <Box
            backgroundColor={"gray.900"}
            border="1px solid"
            borderColor={"gray.700"}
            w={{ base: "90%", md: "75%" }}
            // h={{ base: "100%", md: "50vh" }}
            padding={{ base: "0.6rem", md: "2rem" }}
            marginTop={"1rem"}
            marginBottom={"5rem"}
            color={"gray.300"}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "center", md: "flex-start" }}
              wrap={"wrap"}
            >
              <Image
                src="./src/img/Drun_n_bass.png"
                w={{ base: "100%", md: "50%" }}
                h={{ base: "auto", md: "auto" }}
                marginBottom={{ base: "1rem", md: "0" }}
              />
              <Text
                fontSize={{ base: "0.8rem", md: "md" }}
                marginLeft={{ base: "0", md: "1rem" }}
                flex="1"
                fontFamily={robotoSlabFont}
                fontWeight={robotoSlabWeight.light}
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
                rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
                rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
                quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
              </Text>
            </Flex>
          </Box>
        </Center>

        <Center>
          <Box
            backgroundColor={"gray.900"}
            border="1px solid"
            borderColor={"gray.700"}
            w={{ base: "90%", md: "75%" }}
            // h={{ base: "100%", md: "50vh" }}
            padding={{ base: "0.6rem", md: "2rem" }}
            marginTop={"1rem"}
            marginBottom={"5rem"}
            color={"gray.300"}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "center", md: "flex-start" }}
              wrap={"wrap"}
            >
              <Text
                fontSize={{ base: "0.8rem", md: "md" }}
                marginLeft={{ base: "0", md: "1rem" }}
                flex="1"
                fontFamily={robotoSlabFont}
                fontWeight={robotoSlabWeight.light}
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
                rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
                rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
                quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
              </Text>
              <Image
                src="./src/img/on-blog.png"
                w={{ base: "100%", md: "50%" }}
                h={{ base: "auto", md: "auto" }}
                marginBottom={{ base: "1rem", md: "0" }}
              />
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};
