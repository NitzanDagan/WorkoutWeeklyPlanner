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

export default function Cards({
  data,
  selectedWorkout,
  setSelectedWorkout,
}) {
  const [isCloseMorning, setIsCloseMorning] = useState(false);
  const [isCloseEvening, setIsCloseEvening] = useState(false);
  const [isCheckMorning, setIsCheckMorning] = useState(false);
  const [isCheckEvening, setIsCheckEvening] = useState(false);
  const [isFormOpenMorning, setIsFormOpenMorning] = useState(false);
  const [isFormOpenEvening, setIsFormOpenEvening] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(!selectedWorkout);
  }, [selectedWorkout]);

  const flipToCloseMorning = () => {
    setIsCloseMorning(!isCloseMorning);
  };
  const flipToCheckMorning = () => {
    setIsCheckMorning(!isCheckMorning);
  };
  const flipToCloseEvening = () => {
    setIsCloseEvening(!isCloseEvening);
  };
  const flipToCheckEvening = () => {
    setIsCheckEvening(!isCheckEvening);
  };
  const handleAddWorkoutMorning = () => {
    setIsFormOpenMorning(true);
  };
  const handleAddWorkoutEvening = () => {
    setIsFormOpenEvening(true);
  };

  const cardMorning = (
    <React.Fragment>
      {isFormOpenMorning ? (
        <WeekForm
          setSelectedWorkout={setSelectedWorkout}
          setIsEmpty={setIsEmpty}
        />
      ) : (
        <CardContent className="card-button">
          <Button
            variant="outlined"
            onClick={handleAddWorkoutMorning}
            sx={{ fontSize: "20px", height: "60px", width: "60px" }}
          >
            +
          </Button>
        </CardContent>
      )}
      {!isEmpty && (
        <CardContent className="card-content">
          <Typography sx={{ mb: 1.5 }}>{selectedWorkout}</Typography>
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
      {isFormOpenEvening ? (
        <WeekForm
          setSelectedWorkout={setSelectedWorkout}
          setIsEmpty={setIsEmpty}
        />
      ) : (
        <CardContent className="card-button">
          <Button
            variant="outlined"
            onClick={handleAddWorkoutEvening}
            sx={{ fontSize: "20px", height: "60px", width: "60px" }}
          >
            +
          </Button>
        </CardContent>
      )}
      {!isEmpty && (
        <CardContent className="card-content">
          <Typography sx={{ mb: 1.5 }}>{selectedWorkout}</Typography>
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
        {data.title}
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
