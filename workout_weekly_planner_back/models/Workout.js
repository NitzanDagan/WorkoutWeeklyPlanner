const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

const WorkoutSchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
