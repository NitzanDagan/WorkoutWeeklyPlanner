import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Users/components/SignIn";
import SignUp from "./Users/components/SignUp";
import WeekContainer from "./MyWeek/components/WeekContainer";
import HomePage from "./HomePage/HomePage";
import UsersList from "./Users/components/UsersList";

function WorkoutWeeklyPlanner() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/weekcontainer" element={<WeekContainer />} />
      <Route path="/userslist" element={<UsersList />} />
    </Routes>
  );
}

export default WorkoutWeeklyPlanner;
