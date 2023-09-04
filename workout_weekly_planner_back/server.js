require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

async function connectMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongo");
  } catch (error) {
    console.error(error);
  }
}
connectMongoDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/routes/users", require("./routes/users"));
app.use("/routes/workouts", require("./routes/workouts"));
app.use("/routes/week", require("./routes/week"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
