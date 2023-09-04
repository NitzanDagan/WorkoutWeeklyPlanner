import { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "../MyWeek.css";
import { handleWorkoutChange } from "../functions/workoutFunctions";
import { workoutsList } from "../../../services/Workouts/workoutsList";

export default function WorkoutForm({
  day,
  handleUpdateWorkout,
  updateSelectedCount,
  setSelectedWorkout,
}) {
  const [workout, setWorkout] = useState("");
  const [workoutItems, setWorkoutItems] = useState([]);

  useEffect(() => {
    workoutsList()
      .then((data) => {
        setWorkoutItems(data);
      })
      .catch((error) => {
        console.error("Error retrieving workoutItems:", error);
      });
  }, []);

  return (
    <FormControl
      sx={{
        m: 1,
        width: "80%",
      }}
    >
      <FormControl>
        <InputLabel>Workout</InputLabel>
        <Select
          value={workout}
          label="Choose workout"
          // onChange={handleWorkoutChange}
          onChange={(event) =>
            handleWorkoutChange(
              event,
              setWorkout,
              day,
              handleUpdateWorkout,
              updateSelectedCount,
              setSelectedWorkout
            )
          }
        >
          {workoutItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormControl>
  );
}
