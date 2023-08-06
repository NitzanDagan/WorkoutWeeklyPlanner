import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { WeekNumberContext } from "../../WorkoutWeeklyPlanner";
import { FetchWeekData } from "../../../services/MyWeek/fetchWeekData";

const WeekSummary = () => {
  const weekNumber = useContext(WeekNumberContext);
  const weekData = useContext(FetchWeekData);
  console.log(weekData);
  // const calories = weekData[0]?.calories;
  // console.log(weekData[0]?.calories);
  // const userEmail = localStorage.getItem("userEmail");
  // const [dataExists, setDataExists] = useState(false);
  // const [dataFetched, setDataFetched] = useState(false);
  // const [calories, setCalories] = useState(0);
  // const [selectedCount, setSelectedCount] = useState(0);
  // const [checkedCount, setCheckedCount] = useState(0);
  // const [closedCount, setClosedCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3006/routes/week/getWeekData?userEmail=${userEmail}&weekNumber=${weekNumber}`
  //       );
  //       const data = await response.json();
  //       const dataExists = data.some(
  //         (item) =>
  //           item.userEmail === userEmail && item.weekNumber === weekNumber
  //       );
  //       setDataExists(dataExists);
  //       setDataFetched(true);
  //       if (dataExists) {
  //         const weekData = data.find(
  //           (item) =>
  //             item.userEmail === userEmail && item.weekNumber === weekNumber
  //         );
  //         setSelectedCount(weekData.selectedCount);
  //         console.log(weekData.selectedCount);
  //         setCheckedCount(weekData.checkedCount);
  //         setClosedCount(weekData.closedCount);
  //         console.log(weekData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (weekNumber > 0 && userEmail && !dataFetched) {
  //     fetchData();
  //   }
  // }, [userEmail, weekNumber, dataFetched]);

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
