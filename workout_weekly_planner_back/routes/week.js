const express = require("express");
const router = express.Router();
const Week = require("../models/Week");

router.post("/saveWeekData", async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      weekNumber,
      selectedCount,
      checkedCount,
      closedCount,
    } = req.body;
    const weekData = new Week({
      userName,
      userEmail,
      weekNumber,
      selectedCount,
      checkedCount,
      closedCount,
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
    const weeks = await Week.find({
      userEmail: userEmail,
      weekNumber: weekNumber,
    });
    res.json(weeks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't find weeks" });
  }
});

module.exports = router;
