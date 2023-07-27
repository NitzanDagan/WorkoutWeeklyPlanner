import React, { useState } from "react";
import "../MyWeek.css";
import Cards from "./Cards";
import { Grid, Typography, Box } from "@mui/material";

export default function WeekContainer() {
  const userName = localStorage.getItem("userName");
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const [selectedCount, setSelectedCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);

  const days = [
    { title: "Sunday" },
    { title: "Monday" },
    { title: "Tuesday" },
    { title: "Wednesday" },
    { title: "Thursday" },
    { title: "Friday" },
    { title: "Saturday" },
  ];

  const handleWorkoutCount = (selectedWorkout) => {
    if (selectedWorkout) {
      setSelectedCount((prevCount) => prevCount + 1);
    }
  };

  const updateClosedCount = () => {
    setClosedCount((prevCount) => prevCount + 1);
  };

  const updateCheckedCount = () => {
    setCheckedCount((prevCount) => prevCount + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          color: "text.secondary",
          height: "10vh",
          m: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        My Week
      </Typography>

      <Box>
        <Grid
          container
          spacing={4}
          className="grid-container transparent-background"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            sx={{
              color: "text.secondary",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            xs={12}
          >
            <Typography variant="body1" sx={{ lineHeight: "1.5" }}>
              <b>{userName}</b>, You scheduled {selectedCount} workouts this
              week <br />
              Done: {checkedCount} 🏋️‍♂️ Canceled: {closedCount}
            </Typography>
          </Grid>
          {days.map((card) => (
            <Grid item xs={12} sm={6} md={1.5}>
              <Cards
                data={card}
                setSelectedWorkout={setSelectedWorkout}
                handleWorkoutCount={handleWorkoutCount}
                checkedCount={checkedCount}
                closedCount={closedCount}
                updateClosedCount={updateClosedCount}
                updateCheckedCount={updateCheckedCount}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
