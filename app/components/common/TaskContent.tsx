import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import TaskMenu from "./TaskMenu";

export default function TaskContent({
  task
}: any) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  // Function to safely format dates (ISO 8601 format)
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // Return a default message if invalid
    }
    // Convert to local date string
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleTrash = async (taskId: string) => {
    try {
      // Send a PUT request to the API to trash the task
      const response = await fetch(`https://task-mgt-backend.onrender.com/api/task/trash/${taskId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Task trashed successfully");
        // Optionally, update local state to reflect the trashed task
      } else {
        console.error("Failed to trash the task");
      }
    } catch (error) {
      console.error("Error occurred while trashing task:", error);
    }
  };

  return (
    <CardContent>
      <TaskMenu
        task={task}
        onEdit={()=> null}
        onDelete={handleTrash}
        onDuplicate={()=> null}
      />

      <Box sx={{ my: 2 }}>
        <Typography variant="body2" color="textSecondary" component="div">
          Priority: <Chip label={task.priority} color="primary" size="small" />
        </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Due Date: {formatDate(task.date)} {/* Format task due date */}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Team:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        {task.team.map((member: any) => (
          <Chip
            key={member._id}
            avatar={<Avatar>{getInitials(member.name)}</Avatar>}
            label={member.name}
          />
        ))}
      </Stack>

      {task.subTasks && task.subTasks.length > 0 ? (
        <Stack spacing={2} mt={2}>
          {task.subTasks.map((subTask: any, index: number) => (
            <Card key={index} variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
              <CardContent sx={{ px: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {subTask?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Due: {formatDate(subTask?.date)} {/* Format subtask date */}
                </Typography>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {subTask?.tag}
                </Typography>
                <Chip
                  label={`Task ${index + 1}`}
                  color="primary"
                  size="small"
                />
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {/* No Subtasks */}
        </Typography>
      )}
    </CardContent>
  );
}
