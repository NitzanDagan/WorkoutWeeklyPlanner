import React from "react";
import { DataProvider } from "../services/MyWeek/fetchWeekData";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Users/components/SignIn";
import SignUp from "./Users/components/SignUp";
// import WeekContainer from "./MyWeek/components/WeekContainer";
import WorkoutTable1 from "./MyWeek/components/WorkoutTable1";

import HomePage from "./HomePage/HomePage";
import UsersList from "./Users/components/UsersList";
import SummaryDialog from "./Summary/components/SummaryDialog";

export const WeekNumberContext = React.createContext();

function WorkoutWeeklyPlanner() {
  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          {/* <Route path="/weekcontainer" element={<WeekContainer />} /> */}
          <Route path="/workouttable1" element={<WorkoutTable1 />} />
          <Route path="/userslist" element={<UsersList />} />
          <Route path="/summarydialog" element={<SummaryDialog />} />
        </Routes>
      </DataProvider>
    </>
  );
}

export default WorkoutWeeklyPlanner;
