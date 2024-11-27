"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "./Logo";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Tasks", path: "/dashboard/tasks", icon: <TaskIcon /> },
  {
    name: "Completed",
    path: "/dashboard/tasks/completed",
    icon: <CheckCircleIcon />,
  },
  {
    name: "In Progress",
    path: "/dashboard/tasks/in-progress",
    icon: <HourglassTopIcon />,
  },
  { name: "To Do", path: "/dashboard/tasks/to-do", icon: <ListAltIcon /> },
  { name: "Team", path: "/dashboard/team", icon: <PeopleIcon /> },
  { name: "Trash", path: "/dashboard/trash", icon: <DeleteIcon /> },
];

export default function SideBar() {
  const pathname = usePathname(); // Use usePathname from next/navigation

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        bgcolor: "background.paper",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: 2,
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>

      {/* Navigation Menu */}
      <nav aria-label="main mailbox folders">
        <List sx={{ mt: 1, width: "100%" }}>
          {routes.map((route) => (
            <ListItem key={route.name} disablePadding sx={{ width: "400px" }}>
              <Link href={route.path} passHref>
                <ListItemButton
                  selected={pathname === route.path} // Highlight active route
                  sx={{
                    width: "300px",
                    "&.Mui-selected": {
                      bgcolor: "primary.light",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.name} sx={{ color: "#000" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />

      {/* Bottom Section */}
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
