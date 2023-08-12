import React, { useState, useEffect } from "react";
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
import WeekForm from "./WeekForm";
import { updateWorkouts } from "../../../services/MyWeek/updateWorkouts";

export default function Cards({
  weekData,
  day,
  weekNumber,
  userEmail,
  selectedWorkout,
  setSelectedWorkout,
  handleWorkoutCount,
  updateCheckedCount,
  updateClosedCount,
}) {
  const [isCloseMorning, setIsCloseMorning] = useState(false);
  const [isCloseEvening, setIsCloseEvening] = useState(false);
  const [isCheckMorning, setIsCheckMorning] = useState(false);
  const [isCheckEvening, setIsCheckEvening] = useState(false);
  const [isFormOpenMorning, setIsFormOpenMorning] = useState(false);
  const [isFormOpenEvening, setIsFormOpenEvening] = useState(false);
  const [dbWorkoutsArray, setDbWorkoutsArray] = useState([]);
  const [isWorkoutExist, setIsWorkoutExist] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(!selectedWorkout || !isWorkoutExist);
  }, [selectedWorkout, isWorkoutExist]);

  useEffect(() => {
    if (weekData && weekData.length > 0) {
      setDbWorkoutsArray(weekData[0].days);
    }
  }, [weekData]);

  useEffect(() => {
    checkIfWorkoutExist();
  }, [dbWorkoutsArray]);

  const checkIfWorkoutExist = () => {
    const dayObject = weekData[0].days.find(
      (item) => item.dayOfWeek === day.title
    );
    const workoutExists = dayObject && dayObject.workout.label;
    setIsWorkoutExist(workoutExists);
  };

  const flipToCloseMorning = () => {
    setIsCloseMorning(!isCloseMorning);
    updateClosedCount();
  };
  const flipToCheckMorning = () => {
    setIsCheckMorning(!isCheckMorning);
    updateCheckedCount();
  };
  const flipToCloseEvening = () => {
    setIsCloseEvening(!isCloseEvening);
    updateClosedCount();
  };
  const flipToCheckEvening = () => {
    setIsCheckEvening(!isCheckEvening);
    updateCheckedCount();
  };
  const handleAddWorkoutMorning = () => {
    setIsFormOpenMorning(true);
  };
  const handleAddWorkoutEvening = () => {
    setIsFormOpenEvening(true);
  };


  const handleUpdateWorkout = (day, selectedWorkout, workoutTime) => {
    setSelectedWorkout(selectedWorkout);
    console.log("this calleds?", day, selectedWorkout, workoutTime);

    const workoutObject = {
      label: selectedWorkout,
      time: workoutTime,
    }
    console.log("object:", workoutObject)

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

  const cardMorning = (
    <React.Fragment>
      {!isWorkoutExist && !isFormOpenMorning ? (
        <CardContent className="card-button">
          <Button
            variant="outlined"
            onClick={handleAddWorkoutMorning}
            sx={{ fontSize: "20px", height: "60px", width: "60px" }}
          >
            +
          </Button>
        </CardContent>
      ) : isFormOpenMorning ? (
        <WeekForm
          handleWorkoutCount={handleWorkoutCount}
          setIsEmpty={setIsEmpty}
          day={day.title}
          handleUpdateWorkout={handleUpdateWorkout}
          workoutTime="morning"
        />
      ) : (
        dbWorkoutsArray.find((item) => item.dayOfWeek === day.title)?.workout
          ?.time === "morning" && (
          <CardContent className="card-content">
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontFamily: "fantasy",
                mt: 5,
              }}
              variant="h5"
            >
              {
                dbWorkoutsArray.find((item) => item.dayOfWeek === day.title)
                  ?.workout?.label
              }
            </Typography>
            <CardActions sx={{ margin: "auto" }}>
              <SvgIcon
                component={Close}
                sx={{ color: "red", fontSize: 50 }}
                onClick={flipToCloseMorning}
              />
              <SvgIcon
                component={Done}
                sx={{ color: "green", fontSize: 50 }}
                onClick={flipToCheckMorning}
              />
            </CardActions>
          </CardContent>
        )
      )}
      {!isEmpty && (
        <CardContent className="card-content">
          <CardActions sx={{ margin: "auto" }}>
            <SvgIcon
              component={Close}
              sx={{ color: "red", fontSize: 50 }}
              onClick={flipToCloseMorning}
            />
            <SvgIcon
              component={Done}
              sx={{ color: "green", fontSize: 50 }}
              onClick={flipToCheckMorning}
            />
          </CardActions>
        </CardContent>
      )}
    </React.Fragment>
  );

  const cardEvening = (
    <React.Fragment>
      {!isWorkoutExist && !isFormOpenEvening ? (
        <CardContent className="card-button">
          <Button
            variant="outlined"
            onClick={handleAddWorkoutEvening}
            sx={{ fontSize: "20px", height: "60px", width: "60px" }}
          >
            +
          </Button>
        </CardContent>
      ) : isFormOpenEvening ? (
        <WeekForm
        handleWorkoutCount={handleWorkoutCount}
        setIsEmpty={setIsEmpty}
        day={day.title}
        handleUpdateWorkout={handleUpdateWorkout}
        workoutTime="evening"
        />
      ) : (
        dbWorkoutsArray.find((item) => item.dayOfWeek === day.title)?.workout
          ?.time === "evening" && (
          <CardContent className="card-content">
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontFamily: "fantasy",
                mt: 5,
              }}
              variant="h5"
            >
              {
                dbWorkoutsArray.find((item) => item.dayOfWeek === day.title)
                  ?.workout?.label
              }
            </Typography>
            <CardActions sx={{ margin: "auto" }}>
              <SvgIcon
                component={Close}
                sx={{ color: "red", fontSize: 50 }}
                onClick={flipToCloseEvening}
              />
              <SvgIcon
                component={Done}
                sx={{ color: "green", fontSize: 50 }}
                onClick={flipToCheckEvening}
              />
            </CardActions>
          </CardContent>
        )
      )}
      {!isEmpty && (
        <CardContent className="card-content">
          <CardActions sx={{ margin: "auto" }}>
            <SvgIcon
              component={Close}
              sx={{ color: "red", fontSize: 50 }}
              onClick={flipToCloseEvening}
            />
            <SvgIcon
              component={Done}
              sx={{ color: "green", fontSize: 50 }}
              onClick={flipToCheckEvening}
            />
          </CardActions>
        </CardContent>
      )}
    </React.Fragment>
  );

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

  return (
    <Box sx={{ minWidth: 160 }}>
      <Typography
        component="h2"
        sx={{ fontSize: 20 }}
        color="text.secondary"
        textAlign="center"
        gutterBottom
      >
        {day.title}
      </Typography>
      <Card className="card">
        {isCloseMorning && !isCheckMorning && closedCard}
        {!isCloseMorning && isCheckMorning && checkedCard}
        {!isCloseMorning && !isCheckMorning && cardMorning}
      </Card>
      <Card className="card">
        {isCloseEvening && !isCheckEvening && closedCard}
        {!isCloseEvening && isCheckEvening && checkedCard}
        {!isCloseEvening && !isCheckEvening && cardEvening}
      </Card>
    </Box>
  );
}
