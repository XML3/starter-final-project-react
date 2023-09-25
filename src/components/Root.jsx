import React from "react";
import { createContext, useState, useEffect } from "react";
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

  //get userId route parameters
  // const { userId } = useParams();
  // console.log("userId:", userId);

  //filters events data based on search - to be called in SearchItem.
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
        // if (userId) {
        //   const userResponse = await fetch(
        //     `http://localhost:3000/users/${userId}`
        //   );
        //   const userData = await userResponse.json();
        //   setUsers(userData);
        // }
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
