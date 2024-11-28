import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DashboardCards from "../components/DashboardCards";
import GanttChartPage from "../components/GanttChartPage";
import Tasklist from "../components/TaskList";
import UserInfo from "../components/UserInfo";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <DashboardCards />
      <GanttChartPage />
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={8} md={7}>
          <Tasklist />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <UserInfo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
