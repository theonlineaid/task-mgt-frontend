"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import TaskContent from "@/app/components/common/TaskContent";
import ReusableModal from "@/app/components/common/ReusableModal";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [subtaskDialog, setSubtaskDialog] = useState<{
    open: boolean;
    taskId: string | null;
  }>({ open: false, taskId: null });
  const [newSubtask, setNewSubtask] = useState({
    title: "",
    tag: "",
    date: "",
  });

  // Open the Subtask Dialog
  const handleOpenSubtaskDialog = (taskId: string) => {
    setSubtaskDialog({ open: true, taskId });
  };

  // Close the Subtask Dialog
  const handleCloseSubtaskDialog = () => {
    setSubtaskDialog({ open: false, taskId: null });
    setNewSubtask({ title: "", tag: "", date: "" }); // Reset form
  };

  // Handle Input Changes
  const handleSubtaskChange = (field: string, value: string) => {
    setNewSubtask((prev) => ({ ...prev, [field]: value }));
  };

  // Create Subtask API Call
  const handleCreateSubtask = async () => {
    if (!subtaskDialog.taskId) return;

    try {
      const response = await fetch(
        `https://task-mgt-backend.onrender.com/api/task/create-subtask/${subtaskDialog.taskId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubtask),
        }
      );

      if (response.ok) {
        const { updatedTask } = await response.json();

        // Update the tasks state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === subtaskDialog.taskId
              ? { ...task, subTasks: [...(task.subTasks || []), updatedTask] }
              : task
          )
        );

        handleCloseSubtaskDialog();
      } else {
        console.error("Failed to create subtask:", await response.json());
      }
    } catch (error) {
      console.error("Error creating subtask:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          "https://task-mgt-backend.onrender.com/api/task/",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const stages = ["in progress"];

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" gutterBottom>
        In progress
      </Typography>
      <Grid container spacing={2}>
        {stages.map((stage) => (
          <Grid item xs={12} md={4} key={stage}>
            <Box sx={{ mb: 1, bgcolor: "#fff", p: 2, borderRadius: "4px" }}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: "capitalize",
                  bgcolor: "paper.color",
                }}
              >
                {stage.replace("-", " ")}
              </Typography>
            </Box>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              tasks
                .filter((task) => task.stage === stage)
                .map((task) => (
                  <Card key={task._id} sx={{ mb: 2 }}>
                    <TaskContent task={task} />
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleOpenSubtaskDialog(task._id)}
                      >
                        Add Subtask
                      </Button>
                      <Button size="small" color="secondary">
                        Dependencies
                      </Button>
                    </CardActions>
                  </Card>
                ))
            )}
          </Grid>
        ))}
      </Grid>

      {/* ReusableModal for Adding Subtask */}
      <ReusableModal
        open={subtaskDialog.open}
        onClose={handleCloseSubtaskDialog}
        title="Add Subtask"
        onSubmit={handleCreateSubtask}
      >
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={newSubtask.title}
          onChange={(e) => handleSubtaskChange("title", e.target.value)}
        />
        <TextField
          label="Tag"
          fullWidth
          margin="normal"
          value={newSubtask.tag}
          onChange={(e) => handleSubtaskChange("tag", e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={newSubtask.date}
          onChange={(e) => handleSubtaskChange("date", e.target.value)}
        />
      </ReusableModal>
    </Box>
  );
}
