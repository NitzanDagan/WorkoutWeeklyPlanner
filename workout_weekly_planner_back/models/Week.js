const mongoose = require("mongoose");

const WeekSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    weekNumber: Number,
    selectedCount: Number,
    checkedCount: Number,
    closedCount: Number,
    // calories: Number,
  },
  { timestamps: true }
);

const Week = mongoose.model("Week", WeekSchema);
module.exports = Week;
