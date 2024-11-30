"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

// Define the interface for the user data
interface User {
  _id: string;
  name: string;
  title: string;
  role: string;
  email: string;
  isActive: boolean;
}

export default function UserInfo() {
  const [users, setUsers] = useState<User[]>([]);  // State to store user data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://task-mgt-backend.onrender.com/api/user/get-team",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setUsers(data || []);  // Update state with fetched data
      
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  console.log(users)

  // Function to generate initials from the full name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part: string) => part[0].toUpperCase())
      .join("");
    return initials;
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            User list
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {getInitials(user.name)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>{user.name}</Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user._id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
