import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import ContactForm from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChakraProvider>
        <Root />
      </ChakraProvider>
    ),
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/user/:userId",
        element: <UserPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/careers",
        element: <CareersPage />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
