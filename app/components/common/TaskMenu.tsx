import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TextField,
  Button,
  Chip,
  Autocomplete,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReusableModal from "./ReusableModal";
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router'

const updateTaskApi = async (taskId: string, updatedTask: any) => {
  try {
    const response = await fetch(
      `https://task-mgt-backend.onrender.com/api/task/update/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedTask),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update task");
    }

    return data;
  } catch (error: any) {
    console.error("Error updating task:", error.message);
    throw error;
  }
};

export default function TaskMenu({ task, onDelete, onDuplicate }: any) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [formData, setFormData] = useState({
    title: task.title,
    date: task.date,
    priority: task.priority,
    stage: task.stage,
    team: task.team || [],
  });

  const teamOptions = task?.team?.map((member: any) => ({
    id: member._id, // Unique identifier for each team member
    title: member?.role, // Member's title
    name: member.name, // Member's name
  }));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamChange = (_event: any, value: any) => {
    setFormData({ ...formData, team: value });
  };

  const handleModalSubmit = async () => {
    try {
      await updateTaskApi(editedTask._id, formData);
      console.log("Task updated successfully");
      setModalOpen(false);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const handleDetails = () => {
    // Navigate to the task details page
    router.push(`/dashboard/tasks/${task._id}`); // This assumes that your task details page is located at /tasks/[id]
    setAnchorEl(null); // Close the menu
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={() => onDelete(task._id)}>Delete</MenuItem>
        <MenuItem onClick={() => onDuplicate(task)}>Duplicate</MenuItem>
        <MenuItem onClick={handleDetails}>Details</MenuItem>{" "}
        {/* Details menu item */}
      </Menu>

      <Divider />

      <ReusableModal
        open={isModalOpen}
        onClose={handleModalClose}
        title="Edit Task"
        onSubmit={handleModalSubmit}
      >
        <Box>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <Typography variant="subtitle1">Assign Team</Typography>
          <Autocomplete
            multiple
            options={teamOptions}
            getOptionLabel={(option) => `${option.name} (${option.role})`}
            onChange={handleTeamChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index }); // Destructure key
                return (
                  <Chip
                    key={key} // Apply key explicitly
                    label={`${option.name} (${option.role})`}
                    {...tagProps} // Spread other props
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Team Members"
                margin="normal"
              />
            )}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>

            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <TextField
            select
            label="Stage"
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </Box>
      </ReusableModal>
    </Box>
  );
}
