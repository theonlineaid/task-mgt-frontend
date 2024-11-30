"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Avatar,
  Typography,
  AvatarGroup,
  Box,
  CircularProgress,
} from "@mui/material";

const Tasklist = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/task",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (response.ok) {
          setTasks(result.tasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch operation is done
      }
    };

    fetchTasks();
  }, []);

  // Generate random color for the avatar
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to get initials from name
  const stringAvatar = (name: string) => {
    const nameParts = name.split(" ");
    const initials = `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ""}`;

    return {
      children: initials,
      sx: {
        bgcolor: getRandomColor(), // Set the random background color for each avatar
      },
    };
  };

  // Circle for task title
  const shapeStyles = { width: 12, height: 12 };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Tasks list
      </Typography>

      {loading ? ( // If loading is true, show the spinner
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        // Once loading is false, display the tasks
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Task Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Team</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        ...shapeStyles,
                        borderRadius: "50%",
                        backgroundColor: getRandomColor(),
                        display: "inline-block",
                        marginRight: "8px",
                      }}
                    />
                    {task.title}
                  </TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <AvatarGroup max={4}>
                        {task?.team?.map((member: any) => (
                          <Avatar
                            key={member._id}
                            {...stringAvatar(member.name)}
                          />
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Tasklist;
