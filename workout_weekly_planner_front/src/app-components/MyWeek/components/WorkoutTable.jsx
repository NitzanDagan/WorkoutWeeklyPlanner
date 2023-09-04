import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import WorkoutItem from "./WorkoutItem";
import { FetchWeekData } from "../../../services/MyWeek/fetchWeekData";
import { updateCounts } from "../../../services/MyWeek/updateCounts";
import {
  updateCheckedCount,
  updateClosedCount,
  updateSelectedCount,
} from "../functions/workoutFunctions";

const WorkoutTable = () => {
  const { weekData, weekNumber, userEmail } = useContext(FetchWeekData);
  const [selectedCount, setSelectedCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [loading, setIsLoading] = useState(false);

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
  }, [selectedCount, checkedCount, closedCount, weekNumber, userEmail]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : weekData ? (
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
            {weekData[0].days.map((day, dayIndex) => (
              <Grid
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs={12}
                sm={6}
                md={1.6}
                key={dayIndex}
              >
                {day.workout && (
                  <WorkoutItem
                    key={dayIndex}
                    workout={day.workout}
                    day={day.dayOfWeek}
                    weekNumber={weekNumber}
                    userEmail={localStorage.getItem("userEmail")}
                    updateClosedCount={() => updateClosedCount(setClosedCount)}
                    updateCheckedCount={() =>
                      updateCheckedCount(setCheckedCount)
                    }
                    updateSelectedCount={() =>
                      updateSelectedCount(setSelectedCount)
                    }
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};

export default WorkoutTable;
