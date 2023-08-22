import React, { useState } from "react";
import "../MyWeek.css";
import {
  Card,
  CardContent,
  Typography,
  SvgIcon,
  CardActions,
  Box,
  Button,
} from "@mui/material";
import { Done, Close, CloseSharp, CheckSharp } from "@mui/icons-material";
import WeekForm1 from "./WeekForm1";
import { updateWorkouts } from "../../../services/MyWeek/updateWorkouts";

const WorkoutItem1 = ({
  workout,
  day,
  weekNumber,
  userEmail,
  updateSelectedCount,
  updateCheckedCount,
  updateClosedCount,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isClosedCard, setIsClosedCard] = useState(false);
  const [isCheckedCard, setIsCheckedCard] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  // const [showEmptyCard, setShowEmptyCard] = useState(false);

  const handleUpdateWorkout = (day, selectedWorkout, status) => {
    // setShowEmptyCard(true);

    const workoutObject = {
      label: selectedWorkout,
      status: status,
    };
    updateWorkouts({
      weekNumber: weekNumber,
      userEmail: userEmail,
      days: [
        {
          dayOfWeek: day,
          workout: workoutObject,
        },
      ],
    });
  };

  const closedCard = (
    <CardContent className="back-card">
      <SvgIcon component={CloseSharp} sx={{ fontSize: "5rem", color: "red" }} />
    </CardContent>
  );
  const checkedCard = (
    <CardContent className="back-card">
      <SvgIcon
        component={CheckSharp}
        sx={{ fontSize: "5rem", color: "green" }}
      />
    </CardContent>
  );

  const existCard = (
    <CardContent className={`card-content ${workout.status}`}>
      <Typography
        sx={{
          textAlign: "center",
          color: "text.secondary",
          fontFamily: "fantasy",
          mt: 5,
        }}
        variant="h5"
      >
        {workout.label || selectedWorkout}
      </Typography>
      {/* <p>Calories: {workout.calories}</p>
      <p>Time: {workout.time}</p>
      <p>Duration: {workout.duration} mins</p>
      <p>Status: {workout.status}</p> */}
      <CardActions sx={{ margin: "auto" }}>
        <SvgIcon
          component={Close}
          sx={{ color: "red", fontSize: 50 }}
          onClick={() => flipStatus(day, workout, "close")}
        />
        <SvgIcon
          component={Done}
          sx={{ color: "green", fontSize: 50 }}
          onClick={() => flipStatus(day, workout, "check")}
        />
      </CardActions>
    </CardContent>
  );

  const emptyCard = (
    <CardContent className="card-button">
      <Button
        variant="outlined"
        onClick={() => setIsFormOpen(true)}
        sx={{ fontSize: "20px", height: "60px", width: "60px" }}
      >
        +
      </Button>
    </CardContent>
  );

  const flipStatus = (day, selectedWorkout, status) => {
    handleUpdateWorkout(day, selectedWorkout.label, status);
    if (status === "close") {
      setIsClosedCard(true);
      updateClosedCount();
    } else {
      setIsCheckedCard(true);
      updateCheckedCount();
    }
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <Typography
        component="h2"
        sx={{ fontSize: 20 }}
        color="text.secondary"
        textAlign="center"
        gutterBottom
      >
        {day}
      </Typography>
      <Card className="card">
        {workout.status === "close" && closedCard}
        {workout.status === "check" && checkedCard}
        {isCheckedCard ? checkedCard : null}
        {isClosedCard ? closedCard : null}
        {(workout.label || selectedWorkout) &&  existCard}
        {!workout.label && !isFormOpen && !selectedWorkout && emptyCard}
        {isFormOpen && !selectedWorkout && (
          <WeekForm1
            day={day}
            handleUpdateWorkout={handleUpdateWorkout}
            updateSelectedCount={updateSelectedCount}
            setSelectedWorkout={setSelectedWorkout}
          />
        )}
      </Card>
      {/* {showEmptyCard && (
        <Card className="card">
          {workout.status === "close" && closedCard}
          {workout.status === "check" && checkedCard}
          {isCheckedCard ? checkedCard : null}
          {isClosedCard ? closedCard : null}
          {workout.label && existCard}
          {!workout.label && !isFormOpen && emptyCard}
          {isFormOpen && (
            <WeekForm1 day={day} handleUpdateWorkout={handleUpdateWorkout} />
          )}
        </Card>
      )} */}
    </Box>
  );
};

export default WorkoutItem1;
