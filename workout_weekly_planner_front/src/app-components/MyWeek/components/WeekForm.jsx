import { useState, useEffect } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../../../services/apiConfing";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import "../MyWeek.css";

export default function WeekForm({
  handleWorkoutCount,
  setIsEmpty,
  day,
  handleUpdateWorkout,
  workoutTime,
}) {
  const [workout, setWorkout] = useState("");
  const [workoutItems, setWorkoutItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}${API_ENDPOINTS.workouts.getWorkouts}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving workoutItems" + response.status);
        }
        return response.json();
      })
      .then((workoutItems) => {
        setWorkoutItems(workoutItems);
      })
      .catch((error) => {
        console.error("Error retrieving workoutItems:", error);
      });
  }, []);

  const handleWorkoutChange = (event) => {
    const selectedWorkout = event.target.value;
    if (selectedWorkout !== workout) {
      console.log("Im in the chnage", day, selectedWorkout, workoutTime);
      setWorkout(selectedWorkout);
      setIsEmpty(!selectedWorkout);
      handleWorkoutCount(selectedWorkout);
      handleUpdateWorkout(day, selectedWorkout, workoutTime);
    }
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: "80%",
      }}
    >
      {workout ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontFamily: "fantasy",
            mt: 5,
          }}
          variant="h5"
        >
          {workout}
        </Typography>
      ) : (
        <FormControl>
          <InputLabel>Workout</InputLabel>
          <Select
            value={workout}
            label="Choose workout"
            onChange={handleWorkoutChange}
          >
            {workoutItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </FormControl>
  );
}
