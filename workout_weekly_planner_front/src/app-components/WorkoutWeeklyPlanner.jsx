import React, { useState } from "react";
import { DataProvider } from "../services/MyWeek/fetchWeekData";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Users/components/SignIn";
import SignUp from "./Users/components/SignUp";
import WeekContainer from "./MyWeek/components/WeekContainer";
import HomePage from "./HomePage/HomePage";
import UsersList from "./Users/components/UsersList";
import SummaryDialog from "./Summary/components/SummaryDialog";
import WeekNumber from "./MyWeek/components/WeekNumber";

export const WeekNumberContext = React.createContext();

function WorkoutWeeklyPlanner() {
  const [weekNumber, setWeekNumber] = useState("");
  return (
    <>
      <DataProvider>
        <WeekNumber setWeekNumber={setWeekNumber} />
        <WeekNumberContext.Provider value={weekNumber}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/weekcontainer" element={<WeekContainer />} />
            <Route path="/userslist" element={<UsersList />} />
            <Route path="/summarydialog" element={<SummaryDialog />} />
          </Routes>
        </WeekNumberContext.Provider>
      </DataProvider>
    </>
  );
}

export default WorkoutWeeklyPlanner;
