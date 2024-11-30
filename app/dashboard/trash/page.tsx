"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Task } from "@/app/components/types";

const Trash = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Use Task type for state

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://task-mgt-backend.onrender.com/api/task?isTrashed=true",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setTasks(result.tasks); // Make sure you're using the correct response field
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Function to restore a single task
  const handleRestoreTask = async (taskId: string) => {
    try {
      const response = await fetch(
        `https://task-mgt-backend.onrender.com/api/task/delete-restore/${taskId}?actionType=restore`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, isTrashed: false } : task
          )
        );
      } else {
        console.error("Failed to restore task");
      }
    } catch (error) {
      console.error("Error restoring task:", error);
    }
  };

  // Function to delete a single task
  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(
        `https://task-mgt-backend.onrender.com/api/task/delete-restore/${taskId}?actionType=delete`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to restore all tasks
  const handleRestoreAll = async () => {
    try {
      const response = await fetch(
        "https://task-mgt-backend.onrender.com/api/task/delete-restore?actionType=restoreAll",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => ({ ...task, isTrashed: false }))
        );
      } else {
        console.error("Failed to restore all tasks");
      }
    } catch (error) {
      console.error("Error restoring all tasks:", error);
    }
  };

  // Function to delete all tasks
  const handleDeleteAll = async () => {
    try {
      const response = await fetch(
        "https://task-mgt-backend.onrender.com/api/task/delete-restore?actionType=deleteAll",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setTasks([]); // Clear tasks after deleting them
      } else {
        console.error("Failed to delete all tasks");
      }
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  console.log(tasks);

  return (
    <div style={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Task Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteAll}
            sx={{ mr: 2 }}
          >
            Delete All
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRestoreAll}
          >
            Restore All
          </Button>
        </Box>
      </Box>

      {/* Task Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stage</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.stage}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: task.isTrashed ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {task.isTrashed ? "Trashed" : "Active"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRestoreTask(task._id)} // Restore task
                  >
                    Restore
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteTask(task._id)} // Delete task
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Trash;
