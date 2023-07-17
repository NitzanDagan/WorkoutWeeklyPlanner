import React from "react";
import NavBar from "./HomePage/NavBar";
import WorkoutWeeklyPlanner from "./WorkoutWeeklyPlanner";
import { BrowserRouter, useLocation } from "react-router-dom";

export default function App() {
  // const location = useLocation();


  return (
    <div>
      <BrowserRouter>
        <WorkoutWeeklyPlanner />
        <NavBar />
      </BrowserRouter>
    </div>
  );
}
