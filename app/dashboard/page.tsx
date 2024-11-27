import React from "react";
import { Box, Typography } from "@mui/material";
import DashboardCards from "../components/DashboardCards";
import GanttChartPage from "../components/GanttChartPage";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <DashboardCards />
      <GanttChartPage />
    </Box>
  );
};

export default DashboardPage;
