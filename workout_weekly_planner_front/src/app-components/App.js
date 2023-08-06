import React from "react";
import NavBar from "./HomePage/NavBar";
import WorkoutWeeklyPlanner from "./WorkoutWeeklyPlanner";
import { BrowserRouter } from "react-router-dom";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <WorkoutWeeklyPlanner />
        <NavBar />
      </BrowserRouter>
    </div>
  );
}
