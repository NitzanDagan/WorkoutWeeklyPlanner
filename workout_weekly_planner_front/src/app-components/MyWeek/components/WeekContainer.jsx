import React, { useContext, useState, useEffect } from "react";
import "../MyWeek.css";
import Cards from "./Cards";
import { Grid, Typography, Box } from "@mui/material";
import { WeekNumberContext } from "../../WorkoutWeeklyPlanner";
import { FetchWeekData } from "../../../services/MyWeek/fetchWeekData";
import { updateCounts } from "../../../services/MyWeek/updateCounts";

export default function WeekContainer() {
  const weekData = useContext(FetchWeekData);
  const weekNumber = useContext(WeekNumberContext);
  const userEmail = localStorage.getItem("userEmail");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const days = [
    { title: "Sunday" },
    { title: "Monday" },
    { title: "Tuesday" },
    { title: "Wednesday" },
    { title: "Thursday" },
    { title: "Friday" },
    { title: "Saturday" },
  ];

  useEffect(() => {
    if (weekData && weekData.length > 0) {
      setSelectedCount(weekData[0].selectedCount);
      setCheckedCount(weekData[0].checkedCount);
      setClosedCount(weekData[0].closedCount);
    }
    setIsLoading(false);
  }, [weekData]);

  useEffect(() => {
    updateCounts({
      weekNumber,
      userEmail,
      selectedCount,
      checkedCount,
      closedCount,
    });
  }, [selectedCount, checkedCount, closedCount, weekNumber]);


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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : weekData ? (
        <>
          <div>
            from data - select: {weekData[0]?.selectedCount} cheack:{" "}
            {weekData[0]?.checkedCount} close: {weekData[0]?.closedCount}
          </div>
          <div>
            from state - select: {selectedCount} check: {checkedCount} close:{" "}
            {closedCount}
          </div>
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
              My Week 🏋️‍♂️ Week {weekNumber}
            </Typography>
            <Grid
              container
              spacing={6}
              className="grid-container transparent-background"
              justifyContent="center"
              alignItems="center"
              maxWidth="90vw"
              marginTop="5px"
            >
              {days.map((day) => (
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  xs={12}
                  sm={6}
                  md={1.5}
                  key={day.title}
                >
                  <Cards
                    weekData={weekData}
                    day={day}
                    weekNumber={weekNumber}
                    userEmail={userEmail}
                    selectedWorkout={selectedWorkout}
                    setSelectedWorkout={setSelectedWorkout}
                    handleWorkoutCount={handleWorkoutCount}
                    updateClosedCount={updateClosedCount}
                    updateCheckedCount={updateCheckedCount}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
}
