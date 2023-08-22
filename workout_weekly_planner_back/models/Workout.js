const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    calories: {
      type: Number,
    },
    time: {
      type: String,
    },
    duration: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
