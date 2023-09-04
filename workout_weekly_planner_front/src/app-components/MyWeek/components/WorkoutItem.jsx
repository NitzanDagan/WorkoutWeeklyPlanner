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
import {
  Done,
  Close,
  CloseSharp,
  CheckSharp,
} from "@mui/icons-material";
import WorkoutForm from "./WorkoutForm";
import { updateWorkouts } from "../../../services/MyWeek/updateWorkouts";
import DurationPopover from "./DurationPopover";

const WorkoutItem = ({
  workout: initialWorkout,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [showEmptyCard, setShowEmptyCard] = useState(false);
  const workout = selectedWorkout || initialWorkout;

  const open = Boolean(anchorEl);
  const id = open ? "popover-form" : undefined;

  const handleUpdateWorkout = (day, selectedWorkout, options) => {
    const updateWorkout = {
      ...options,
    };
    if (!selectedWorkout.label) {
      updateWorkout.label = selectedWorkout;
    }
    updateWorkouts({
      weekNumber: weekNumber,
      userEmail: userEmail,
      days: [
        {
          dayOfWeek: day,
          workout: updateWorkout,
        },
      ],
    });
    setShowEmptyCard(true);
  };

  const flipStatus = (day, selectedWorkout, status) => {
    handleUpdateWorkout(day, selectedWorkout, { status: status });
    if (status === "close") {
      setIsClosedCard(true);
      updateClosedCount();
    } else {
      setIsCheckedCard(true);
      updateCheckedCount();
      setAnchorEl(true);
    }
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
      <CardActions sx={{ margin: "auto" }}>
        <SvgIcon
          component={Close}
          sx={{ color: "red", fontSize: 50 }}
          onClick={() => flipStatus(day, workout, "close")}
        />
        <SvgIcon
          component={Done}
          variant="contained"
          aria-describedby={id}
          sx={{ color: "green", fontSize: 50 }}
          onClick={(event) => {
            flipStatus(day, workout, "check");
            setAnchorEl(event.currentTarget);
          }}
        />
      </CardActions>

      <DurationPopover
        open={open}
        anchorEl={anchorEl}
        handleClosePopover={() => setAnchorEl(null)}
        handleUpdateWorkout={handleUpdateWorkout}
        day={day}
        selectedWorkout={selectedWorkout}
      />
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
        {(workout.label || selectedWorkout) && existCard}
        {!workout.label && !isFormOpen && !selectedWorkout && emptyCard}
        {isFormOpen && !selectedWorkout && (
          <WorkoutForm
            day={day}
            handleUpdateWorkout={handleUpdateWorkout}
            updateSelectedCount={updateSelectedCount}
            setSelectedWorkout={setSelectedWorkout}
          />
        )}
      </Card>
      {selectedWorkout && showEmptyCard && (
        <Card className="card">
          {emptyCard}
          <CardContent className="card-button">
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedWorkout("");
                setIsFormOpen(true);
              }}
              sx={{ fontSize: "20px", height: "60px", width: "60px" }}
            >
              +
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default WorkoutItem;
