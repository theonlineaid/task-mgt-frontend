import React from "react";
import Notification from "./Notification";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <SearchBar placeholder={"search.."} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Notification />
          <AccountMenu />
        </Box>
      </Box>
    </div>
  );
}
