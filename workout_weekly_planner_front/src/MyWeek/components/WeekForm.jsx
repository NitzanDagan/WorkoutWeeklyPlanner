import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "../MyWeek.css";
export default function WeekForm({ setSelectedWorkout, setIsEmpty }) {
  const [workout, setWorkout] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3006/routes/workouts/getWorkouts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving menuItems" + response.status);
        }
        return response.json();
      })
      .then((menuItems) => {
        setMenuItems(menuItems);
      })
      .catch((error) => {
        console.error("Error retrieving menuItems:", error);
      });
  }, []);

  const handleWorkoutChange = (event) => {
    const selectedWorkout = event.target.value;
    setWorkout(selectedWorkout);
    setSelectedWorkout(selectedWorkout);
    setIsEmpty(!selectedWorkout);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Workout</InputLabel>
      <Select
        value={workout}
        label="Choose workout"
        onChange={handleWorkoutChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
