import { Card, CardBody, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "./Root";

export const EventsCard = ({ event }) => {
  //access global fetch from Root
  const { categories } = useContext(DataContext);
  const { image, title, description, startTime, endTime, categoryIds } = event;

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
    <div className="event-card">
      <Card
        as={Link}
        to={`/event/${event.id}`}
        bgColor="gray.900"
        borderRadius="md"
        w="15rem"
        h="25rem"
        cursor="pointer"
        _hover={{ transform: "scale(1.01)" }}
      >
        <CardBody>
          <Heading
            as="h2"
            size={"lg"}
            color={"pink.500"}
            mb={"1rem"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.medium}
          >
            {title}
          </Heading>

          <Image src={image} borderRadius={"sm"} mb={"1rem"} />
          <Text
            fontSize={"sm"}
            color={"green.200"}
            mb={"1rem"}
            fontFamily={orbitronFontFamily}
            fontWeight={orbitronWeight.normal}
          >
            {description}
          </Text>

          <Text
            color={"whitesmoke"}
            fontSize={"2xs"}
            fontFamily={robotoSlabFont}
            fontWeight={robotoSlabWeight.thin}
          >
            {" "}
            Start Time: {startTime}
          </Text>
          <Text
            color={"whitesmoke"}
            fontSize={"2xs"}
            mb={"0.5rem"}
            fontFamily={robotoSlabFont}
            fontWeight={robotoSlabWeight.thin}
          >
            End Time: {endTime}
          </Text>

          {/* Display categories */}
          <Stack direction="row">
            {Array.isArray(event.categoryIds) ? (
              event.categoryIds.map((categoryId) => {
                const category = categories.find(
                  (category) => category.id === categoryId
                );
                if (!category) return null;

                return (
                  <Text
                    key={category.id}
                    color="yellow.300"
                    fontSize={"xs"}
                    fontFamily={orbitronFontFamily}
                    fontWeight={orbitronWeight.normal}
                  >
                    {category.name}
                  </Text>
                );
              })
            ) : (
              <Text>No categories available</Text>
            )}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};
