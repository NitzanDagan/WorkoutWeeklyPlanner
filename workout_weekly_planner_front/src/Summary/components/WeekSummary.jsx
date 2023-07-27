import React from "react";
import { Box, Typography } from "@mui/material";

const WeekSummary = ({ selectedCount, closedCount, checkedCount }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "primary.main",
        color: "white",
        minHeight: "100px",
        py: 2,
      }}
    >
      <Typography variant="h6">Weekly Summary</Typography>
      <Typography variant="body1">
        Workouts scheduled: {selectedCount}
      </Typography>
      <Typography variant="body1">Workouts done: {checkedCount} 🏋️‍♂️</Typography>
      <Typography variant="body1">Workouts canceled: {closedCount}</Typography>
    </Box>
  );
};

export default WeekSummary;
