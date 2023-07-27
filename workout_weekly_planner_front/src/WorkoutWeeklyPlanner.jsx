import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Users/components/SignIn";
import SignUp from "./Users/components/SignUp";
import WeekContainer from "./MyWeek/components/WeekContainer";
import HomePage from "./HomePage/HomePage";
import UsersList from "./Users/components/UsersList";
import WeekSummary from "./Summary/components/WeekSummary";

function WorkoutWeeklyPlanner() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/weekcontainer" element={<WeekContainer />} />
      <Route path="/userslist" element={<UsersList />} />
      <Route path="/weeksummary" element={<WeekSummary />} />
    </Routes>
  );
}

export default WorkoutWeeklyPlanner;
