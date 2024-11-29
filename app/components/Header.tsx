"use client";

import React, { useState } from "react";
import Notification from "./Notification";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateTaskModal from "./TaskModel";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        position: "sticky", // Makes the header sticky
        top: 0, // Sticks to the top of the viewport
        zIndex: 1000, // Ensures it stays above other elements
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        bgcolor: "background.paper",
        padding: "24px 16px", // Adds padding for better aesthetics
      }}
    >
      <SearchBar placeholder={"search.."} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px", // Adds spacing between Notification and AccountMenu
        }}
      >
        <CreateTaskModal />

        {/* Notification Icon */}
        <IconButton onClick={toggleDrawer}>
          <NotificationsIcon />
        </IconButton>

        <AccountMenu />
      </Box>

      {/* Drawer for notifications */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: "300px", // Custom width of the drawer
          flexShrink: 0, // Prevents the drawer from shrinking
        }}
      >
        {/* Add the content of the drawer here */}
        <Box
          sx={{
            width: 300, // Custom width of the drawer content
            padding: "16px",
            bgcolor: "background.paper", // Optional: Set background color
          }}
        >
          Notification gose here
          {/* You can add your custom notification content here */}
        </Box>
      </Drawer>
    </Box>
  );
}
