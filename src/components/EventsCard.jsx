import { Card, CardBody, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "./Root";

export const EventsCard = ({ event }) => {
  //access global fetch from Root
  const { categories } = useContext(DataContext);
  const { image, title, description, startTime, endTime, categoryIds } = event;
  //console.log("categoryIds:", categoryIds);
  // console.log("event.categoryIds:", event.categoryIds);

  return (
    <div className="event-card">
      <Card
        as={Link}
        to={`/event/${event.id}`}
        bgColor="gray.700"
        borderRadius="md"
        w="15rem"
        h="25rem"
        cursor="pointer"
        _hover={{ transform: "scale(1.01)" }}
      >
        <CardBody>
          <Heading as="h2" size={"lg"} color={"pink.500"} mb={"1rem"}>
            {title}
          </Heading>

          <Image src={image} borderRadius={"sm"} mb={"1rem"} />
          <Text fontSize={"sm"} color={"green.200"} mb={"1rem"}>
            {description}
          </Text>

          <Text color={"whitesmoke"} fontSize={"2xs"}>
            {" "}
            Start Time: {startTime}
          </Text>
          <Text color={"whitesmoke"} fontSize={"2xs"} mb={"0.5rem"}>
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
                  <Text key={category.id} color="yellow.300" fontSize={"xs"}>
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
