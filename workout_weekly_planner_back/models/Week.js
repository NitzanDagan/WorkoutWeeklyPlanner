const mongoose = require("mongoose");
const Workout = require("../models/Workout");

const WeekSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    weekNumber: Number,
    selectedCount: { type: Number, default: 0 },
    checkedCount: { type: Number, default: 0 }, 
    closedCount: { type: Number, default: 0 }, 
    calories: {type:Number, default:0},
    days: [
      {
        dayOfWeek: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        workout: Workout.schema,
      },
    ],
  },
  { timestamps: true }
);

const Week = mongoose.model("Week", WeekSchema);
module.exports = Week;
