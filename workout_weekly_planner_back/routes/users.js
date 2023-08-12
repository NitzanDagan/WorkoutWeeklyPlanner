const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const { response } = require("express");
router.use(express.json());
router.use(cors());

//RETURN ALL USERS
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't find users" });
  }
});

// TOKEN
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
}

// SIGN IN
router.post(
  "/signin",
  [
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ message: errorMessages.join(" ") });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ message: "User does not exist. Please sign up first." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid password, please try again." });
      }
      const token = generateToken(user._id);
      const userName = user.name;
      res.json({ message: "Sign in successful.", token, userName, email });
      console.log(token);
    } catch (error) {
      console.error(error);
      if (error.message.includes("email")) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = decodedToken.userId;
    next();
  });
}

// LOG OUT
router.post("/logout", authenticateToken, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.json({ message: "Logout successful" });
  });
});

//SIGN UP
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing data - Please provide name, email, and password.",
    });
  }

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.json({ message: "Sign up successful.", savedUser });


  } catch (error) {
    console.error(error);
    if (error.errors && error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ message: errorMessages });
    } else if (error.code === 11000 && error.keyValue) {
      const fieldName = Object.keys(error.keyPattern)[0];
      const duplicatedValue = Object.values(error.keyValue)[0];
      const errorMessage = `Duplicate key error: Field ${fieldName} with value ${duplicatedValue} already exists.`;
      res.status(400).json({ message: errorMessage });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//EDIT USER ???
// router.put("/:id", (req, res) => {
//   const found = users.some((user) => user.id === parseInt(req.params.id));
//   if (found) {
//     const updateUser = req.body;
//     users.forEach((user) => {
//       if (user.id === parseInt(req.params.id)) {
//         user.name = updateUser.name ? updateUser.name : user.name;
//         user.email = updateUser.email ? updateUser.email : user.email;
//         res.json({ msg: "User updated:)", user });
//       }
//     });
//   }
// });

//DELETE USER ????
// router.delete("/deleteUser", (req, res) => {
//   const found = User.some((user) => user.email === (req.params.email));
//   if (found) {
//     User = User.filter((user) => user.email !== (req.params.email));
//     res.json({ msg: "User deleted:)", User });
//   } else {
//     res.status(400);
//   }
// });

module.exports = router;
