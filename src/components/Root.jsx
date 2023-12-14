import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { NavigationFooter } from "./NavigationFooter";
import NewEvent from "./form/NewEvent";
import { useToast } from "@chakra-ui/react";

//creating context for data
const DataContext = createContext();

//manage and provide data
export const Root = ({ initialEvents, children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const toast = useToast();

  //filters events data based on search - to be called in SearchItem/EventsPage.
  const handleFilteredEvents = (searchValue) => {
    if (searchValue === "") {
      setFilteredEvents(eventsData);
    } else {
      const matchedEvents = eventsData.filter((event) => {
        const { location, title } = event;
        return (
          location.toLowerCase().includes(searchValue.toLowerCase()) ||
          title.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFilteredEvents(matchedEvents);
    }
  };

  //Global fetch for events/categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetch events
        const eventsResponse = await fetch("http://localhost:3000/events");
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);
        //for filtering events - user input- search functionality
        setFilteredEvents(eventsData);

        //Fetch categories
        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // //Fetch users
        if (users) {
          const userResponse = await fetch(
            `http://localhost:3000/users/${users}`
          );
          const userData = await userResponse.json();
          setUsers(userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //handles event data when succesfully created on the server/ moved and modified the following piece of code from EventsPage.
  const handleEventAdded = async (NewEventData) => {
    try {
      //send POST
      const newEventResponse = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewEventData),
      });

      if (newEventResponse.ok) {
        const updatedEventsResponse = await fetch(
          "http://localhost:3000/events"
        );
        const updatedEvents = await updatedEventsResponse.json();
        setEventsData(updatedEvents);

        setFilteredEvents((prevFilteredEvents) => [
          ...prevFilteredEvents,
          NewEventData,
        ]);

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
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  //function to handle the new event getting automatically posted without refreshing page.
  const addEvent = (newEvent) => {
    setFilteredEvents((prevFilteredEvents) => [
      ...prevFilteredEvents,
      newEvent,
    ]);
  };

  //fucntion to Delete auto
  const deleteEvent = (eventId) => {
    setFilteredEvents((prevFilteredEvents) => [
      ...prevFilteredEvents.filter((e) => e.id !== eventId),
    ]);
  };

  //object to define the values for children components
  const contextValue = {
    events: eventsData,
    categories,
    users,
    description,
    showToast: toast,
    handleFilteredEvents,
    handleEventAdded,
    filteredEvents,
    addEvent,
    deleteEvent,
  };

  return (
    <DataContext.Provider value={contextValue}>
      <Navigation />
      {/* {children} */}
      <Outlet />
      <NavigationFooter />
    </DataContext.Provider>
  );
};

export default DataContext;
