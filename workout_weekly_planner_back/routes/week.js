const express = require("express");
const router = express.Router();
const Week = require("../models/Week");

router.post("/saveWeekData", async (req, res) => {
  try {
    const { userName, userEmail, weekNumber } = req.body;
    const weekSchema = Week.schema;
    const dayOfWeekEnum = weekSchema
      .path("days")
      .schema.path("dayOfWeek").enumValues;
    const days = dayOfWeekEnum.map((day) => ({
      dayOfWeek: day,
      workout: { label: "", time: "", duration: "" },
    }));
    const weekData = new Week({
      userName,
      userEmail,
      weekNumber,
      days,
    });
    await weekData.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't save data" });
  }
});

router.get("/getWeekData", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    const weekNumber = req.query.weekNumber;
    if (!userEmail || !weekNumber) {
      const allData = await Week.find();
      return res.status(200).json(allData);
    }

    const myWeek = await Week.find({
      userEmail: userEmail,
      weekNumber: weekNumber,
    });

    if (myWeek.length === 0) {
      return res.status(404).json({ message: "Week data not found" });
    }

    res.json(myWeek);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't find weeks" });
  }
});

router.post("/updateCounts", async (req, res) => {
  try {
    const {
      weekNumber,
      userEmail,
      // days,
      checkedCount,
      closedCount,
      selectedCount,
    } = req.body;
    const weekData = await Week.findOne({ weekNumber, userEmail });
    if (!weekData) {
      return res.status(404).json({ message: "User not found" });
    }
    // weekData.days = days;
    weekData.selectedCount = selectedCount;
    weekData.checkedCount = checkedCount;
    weekData.closedCount = closedCount;
    await weekData.save();
    return res.status(200).json({ message: "Counts updated successfully" });
  } catch (error) {
    console.error("Error updating counts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateWorkouts", async (req, res) => {
  try {
    const { weekNumber, userEmail, days } = req.body;
    const weekData = await Week.findOne({ weekNumber, userEmail });
    if (!weekData) {
      return res.status(404).json({ message: "User not found" });
    }
    for (const day of days) {
      const { dayOfWeek, workout } = day;
      const existingDay = weekData.days.find(
        (item) => item.dayOfWeek === dayOfWeek
      );
      if (existingDay) {
        const existingWorkout = existingDay.workout;
        if (existingWorkout && existingWorkout.label === workout.label) {
          existingWorkout.time = workout.time;
          existingWorkout.duration = workout.duration;
        } else {
          existingDay.workout = {
            label: workout.label, 
            time: workout.time,
            duration: workout.duration,
          };
        }
      } else {
        weekData.days.push({ dayOfWeek, workout });
      }
    }

    await weekData.save();
    return res.status(200).json({ message: "Workouts updated successfully" });
  } catch (error) {
    console.error("Error updating counts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
