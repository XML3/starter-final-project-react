import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { NavigationFooter } from "./NavigationFooter";

export const Root = ({ events, setFilteredEvents }) => {
  return (
    <>
      <Navigation events={events} setFilteredEvents={setFilteredEvents} />
      <Outlet />
      <NavigationFooter />
    </>
  );
};
