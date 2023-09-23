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
  console.log("Root component: Start");

  const [eventsData, setEventsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const toast = useToast();

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

  //Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch("http://localhost:3000/events");
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);
        setFilteredEvents(eventsData);

        //Fetch categories
        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //moved and modified the following piece of code from EventsPage
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
        const updatedEvnts = await updatedEventsResponse.json();
        setEventsData(updatedEvnts);

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
