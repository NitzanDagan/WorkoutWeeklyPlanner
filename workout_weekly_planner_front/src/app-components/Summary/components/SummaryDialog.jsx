import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FetchWeekData } from "../../../services/MyWeek/fetchWeekData";

const WeekSummary = () => {
  const { weekData, weekNumber } = useContext(FetchWeekData);
  return (
    <>
      {weekData ? (
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
            Weekly Summary 🏋️‍♂️ Week {weekNumber}
          </Typography>

          <Grid
            container
            spacing={6}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            justifyContent="center"
            className="transparent-background"
            alignItems="center"
            maxWidth="60vw"
            marginTop="5px"
            sx={{
              textAlign: "center",
            }}
          >
            <Grid item xs={12} md={3} lg={3}>
              <Typography
                sx={{
                  fontSize: "5rem",
                  fontFamily: "cursive",
                  color: "#7a96ea",
                }}
              >
                {weekData[0]?.calories}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                 Calories burned
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Typography
                sx={{
                  fontSize: "5rem",
                  fontFamily: "cursive",
                  color: "#7a96ea",
                }}
              >
                {weekData[0]?.selectedCount}
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body1">
                Workouts scheduled
              </Typography>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Typography
                sx={{
                  fontSize: "5rem",
                  fontFamily: "cursive",
                  color: "#7a96ea",
                }}
              >
                {weekData[0]?.checkedCount}
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body1">
                Workouts done{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Typography
                sx={{
                  fontSize: "5rem",
                  fontFamily: "cursive",
                  color: "#7a96ea",
                }}
              >
                {weekData[0]?.closedCount}
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body1">
                Workouts canceled
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default WeekSummary;
