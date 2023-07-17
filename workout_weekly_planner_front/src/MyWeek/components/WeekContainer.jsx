import React, { useState } from "react";
import "../MyWeek.css";
import Cards from "./Cards";
import { Grid, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function WeekContainer() {
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const days = [
    { title: "Sunday" },
    { title: "Monday" },
    { title: "Tuesday" },
    { title: "Wednesday" },
    { title: "Thursday" },
    { title: "Friday" },
    { title: "Saturday" },
  ];

  const defaultTheme = createTheme();
  const [selectedWorkouts, setSelectedWorkouts] = useState({});
  const handleSelectWorkout = (day, workout) => {
    setSelectedWorkouts((prevSelectedWorkouts) => {
      const updatedSelectedWorkouts = { ...prevSelectedWorkouts };
      updatedSelectedWorkouts[day] = workout;
      return updatedSelectedWorkouts;
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          sx={{ color: "text.secondary", height: "10vh", mt: "20px" }}
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
            {days.map((card, index) => (
              <Grid item xs={12} sm={6} md={1.5}>
                <Cards
                  data={card}
                  selectedWorkout={selectedWorkouts[card.title]}
                  onSelectWorkout={handleSelectWorkout}
                  setSelectedWorkout={setSelectedWorkout}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
