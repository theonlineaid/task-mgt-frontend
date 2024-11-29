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

export default function UserInfo() {
  const [users, setUsers] = useState<any[]>([]);
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
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []);

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
                {users.map((user: any) => (
                  <TableRow key={user._id}>
                    {/* Avatar and Name */}
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
