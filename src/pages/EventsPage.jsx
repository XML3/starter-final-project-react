import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";
import NewEvent from "../components/form/NewEvent";
import { SearchItem } from "../components/SearchItem";
import DataContext from "../components/Root";
import ImgAnimation from "../components/ImgAnimation";
import TextAnimation from "../components/TextAnimation";
import Typewriter from "../components/Typewriter";

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
    articles,
    imgAnimation,
    header,
    subHeader,
  } = useContext(DataContext);
  console.log("header:", header);

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
          minH={"80vh"}
          direction={{ base: "column", md: "row" }}
        >
          <Box ml={{ base: "0", md: "1.5rem" }} mr={{ base: "0", md: "2rem" }}>
            <Heading
              fontFamily={orbitronFontFamily}
              fontWeight={orbitronWeight.semibold}
              color={"green.200"}
              // ml={"1.5rem"}
              fontSize={{ base: "24px", md: "50px", lg: "80px", xl: "100px" }}
              lineHeight={"1.2"}
              mt={{ base: "1rem", md: "0" }}
              ml={{ base: "0.5rem", md: "0" }}
              maxW={{ base: "100%", md: "900px" }}
            >
              {/* Electronic Music <br />
              Events */}
              <Typewriter text={header} delay={100} />
            </Heading>

            <Text
              color={"gray.300"}
              ml={{ base: "0.5rem", md: "0.5rem" }}
              fontSize={{ base: "18px", md: "20px" }}
              mt={{ base: "1rem", md: "1rem" }}
              maxW={{ base: "100%", md: "45rem" }}
              marginBottom={{ base: "2rem", md: "2rem" }}
              fontFamily={robotoSlabFont}
              fontWeight={robotoSlabWeight.light}
            >
              {/* We aim to provide information on Electronic Music Events in your
              area by offering our service to all promoters for different types
              of venues and size events in all corners of the world to enrich
              human lives through movement and sound. */}
              <Typewriter text={subHeader} delay={30} />
            </Text>
          </Box>
          <ImgAnimation
            imgAnimation={imgAnimation}
            maxW={{ base: "100%", md: "400px" }}
          />
        </Flex>
        {/* 


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
              ml={{ base: "7rem", md: "55rem" }}
              mb={{ base: "2rem", md: "5rem" }}
              mt={{ base: "2rem", md: "-20rem" }}
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
              bgColor={"gray.900"}
              w={{ base: "100%", md: "100%" }}
              h={"100%"}
              borderRadius={"md"}
              border="1px solid"
              borderColor={"gray.700"}
              mr={{ base: 0, md: "2rem" }}
              mb={"1rem"}
              ml={{ base: 0, md: "-0.5rem" }}
              padding={"2rem"}
              // overflowY="scroll"
              position={"relative"}
              mt={{ base: "2rem", md: "-10rem" }}
              left={{ base: -6, md: 0 }}
            >
              {/* search box fixed*/}
              {/* <Box
                position={"sticky"}
                backgroundColor={"gray.900"}
                top={-8}
                right={0}
                mt={-6}
                ml={{ base: "0.1rem", md: "0" }}
                zIndex={1}
                p={1}
              > */}
              {/* Search Event Input */}
              <Flex align={"flex-start"} justify={"flex-start"}>
                <Box>
                  <Text
                    fontFamily={orbitronFontFamily}
                    fontWeight={orbitronWeight.medium}
                    fontSize={{ base: "1rem", md: "1rem" }}
                    color={"gray.200"}
                  >
                    Search Events:
                    <SearchItem
                      events={events}
                      handleFilteredEvents={handleFilteredEvents}
                    />
                  </Text>
                </Box>
              </Flex>
              {/* </Box> */}

              {/* Events Cards */}
              <Flex align={"center"} justify={"center"}>
                <SimpleGrid
                  columns={columns}
                  gap={8}
                  position={"relative"}
                  right={{ base: 14, md: 0 }}
                  w={{ base: "50%", md: "100%" }}
                >
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

        <Box mt={{ base: "4rem", md: "20rem" }} mb="3rem">
          <TextAnimation />
        </Box>

        {/* Here starts the bottom section with Text and images  */}
        {articles.map((item, index) => (
          <Center key={articles.id}>
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
                //use the index to modify the render logic of map to determine it is even or odd in order to invert the section (image, text placement of each id)
                direction={{
                  base: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                }}
                align={{ base: "center", md: "flex-start" }}
                wrap={"wrap"}
              >
                <Image
                  //src="./src/img/Drun_n_bass.png"
                  src={item.image}
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
                  {item.text}
                </Text>
              </Flex>
            </Box>
          </Center>
        ))}
      </Box>
    </>
  );
};
