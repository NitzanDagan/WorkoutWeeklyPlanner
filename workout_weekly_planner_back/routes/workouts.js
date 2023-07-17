const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/getWorkouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't find workouts" });
  }
});

module.exports = router;
