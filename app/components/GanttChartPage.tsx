"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Task {
  _id: string;
  title: string;
  date: string; // Start date (format: YYYY-MM-DD)
  stage: string;
}

// Helper function to parse date safely
const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Component to render Gantt chart
const GanttChart = ({ tasks }: { tasks: Task[] }) => {
  const daysToMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  // Map tasks to chart rows
  const rows = tasks.map((task) => {
    const startDate = parseDate(task.date);
    const endDate = startDate
      ? new Date(startDate.getTime() + daysToMilliseconds(7))
      : null; // Default to 7 days if no end date provided

    return [
      task._id,
      task.title,
      startDate,
      endDate,
      endDate && startDate ? null : daysToMilliseconds(7), // Duration if no dates
      Math.floor(Math.random() * 100), // Random placeholder for percent complete
      null, // No dependencies
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
      loader={<div>Loading Chart...</div>}
    />
  );
};

// Main Gantt Chart Page Component
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
        setError(err.message || "An unknown error occurred.");
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
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography>No tasks available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5">Task Overflow</Typography>
      <GanttChart tasks={tasks} />
    </Box>
  );
}
