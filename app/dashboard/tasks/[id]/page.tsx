"use client";

import { Task } from '@/app/components/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';

const TaskDetailsPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams();  // Get the `id` directly from the URL params

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`https://task-mgt-backend.onrender.com/api/task/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error('Failed to fetch task details');
        }

        const data = await res.json();
        
        if (data.status) {
          setTask(data.task);  // Assuming `task` is the actual task object
        } else {
          console.error('No task data found');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);  // Re-fetch when `id` changes

  if (!task) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            <strong>Priority:</strong> {task.priority} &nbsp;|&nbsp; <strong>Stage:</strong> {task.stage}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            <strong>Assigned Team:</strong>
          </Typography>
          <List>
            {task.team.map((member) => (
              <ListItem key={member._id}>
                <ListItemText
                  primary={`${member.name} (${member.title} - ${member.role})`}
                  secondary={member.email}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            <strong>Subtasks:</strong>
          </Typography>
          <List>
            {task.subTasks.map((subTask) => (
              <ListItem key={subTask._id}>
                <ListItemText
                  primary={subTask.title}
                  secondary={<Chip label={subTask.tag} color="primary" size="small" />}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            <strong>Activities:</strong>
          </Typography>
          <List>
            {task.activities.map((activity) => (
              <ListItem key={activity._id}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body2">
                      <strong>{activity.by.name}:</strong> {activity.activity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(activity.date).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Optional: Display additional information or actions */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Task Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TaskDetailsPage;
