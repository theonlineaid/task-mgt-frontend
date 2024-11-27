import React from "react";
import Notification from "./Notification";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";

export default function Header() {
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
        // boxShadow: 1, // Optional: Adds a slight shadow for separation
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
        <Notification />
        <AccountMenu />
      </Box>
    </Box>
  );
}
