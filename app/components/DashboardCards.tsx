"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const DashboardCards: React.FC = () => {
  const [taskData, setTaskData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          "https://task-mgt-backend.onrender.com/api/task/dashboard",
          {
            method: "GET",
            cache: "no-store",
            credentials: "include", // Ensures cookies are sent
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch task data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log
        setTaskData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, []);


  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!taskData || taskData.totalTasks === 0) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks available.
        </Typography>
      </Box>
    );
  }

  const cardDetails = [
    {
      title: "Total Tasks",
      value: taskData.totalTasks,
      icon: <AssignmentIcon fontSize="large" color="primary" />,
      bgColor: "#e3f2fd",
    },
    {
      title: "In Progress",
      value: taskData.tasks["in progress"] || 0,
      icon: <HourglassEmptyIcon fontSize="large" color="warning" />,
      bgColor: "#fff3e0",
    },
    {
      title: "To Do",
      value: taskData.tasks.todo || 0,
      icon: <PlaylistAddCheckIcon fontSize="large" color="secondary" />,
      bgColor: "#fce4ec",
    },
    {
      title: "Completed",
      value: taskData.tasks.completed || 0,
      icon: <CheckCircleIcon fontSize="large" color="success" />,
      bgColor: "#e8f5e9",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cardDetails.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: card.bgColor,
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
            <Box sx={{ marginRight: 2 }}>{card.icon}</Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
