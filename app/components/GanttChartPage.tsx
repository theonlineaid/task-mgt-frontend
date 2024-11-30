"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Task {
  _id: string;
  title: string;
  date: string;
  dependencies: string[];
  stage: string;
}

const GanttChart = ({ tasks }: { tasks: Task[] }) => {
  // Helper function to calculate the milliseconds for durations
  const daysToMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

  // Define columns for the Google Gantt chart
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" }, // Added for dependencies
  ];

  // Transform the tasks into the required format for Google Gantt
  const rows = tasks.map((task) => {
    const startDate = new Date(task.date);
    const endDate = new Date(startDate.getTime() + daysToMilliseconds(1)); // Adding one day for end date

    // Return the task in the required format for Google Gantt chart
    return [
      task._id, // Task ID
      task.title, // Task Name
      startDate, // Start Date
      endDate, // End Date
      null, // Duration (null because we have start and end date)
      task.stage === "completed" ? 100 : task.stage === "in progress" ? 50 : 0, // Progress based on stage
      task.dependencies.join(", ") || null, // Dependencies
    ];
  });

  const data = [columns, ...rows];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default function GanttChartPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "https://task-mgt-backend.onrender.com/api/task/dashboard",
          {
            cache: "no-store",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data.last10Task || []); // Set the tasks from the API response
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant={"h5"}>Task Overflow</Typography>
      <GanttChart tasks={tasks} />
    </Box>
  );
}
