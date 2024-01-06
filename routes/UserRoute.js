import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDetail } from "../model/UserModal.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingEmail = await UserDetail.findOne({ email });

    if (existingEmail) {
      return res.status(200).json({
        message: "Email already exists",
        data: "Email already exists",
      });
    } else {
      // Create a new user with hashed password
      // Hash the password
      const hash = await bcrypt.hash(password, 10);

      const newUser = new UserDetail({ username, email, password: hash });

      // Save the new user to the database

      const userData = await newUser.save();

      res.json({ message: "Success", data: userData });
    }
  } catch (error) {
    console.error("Error in POST method:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let verifyEmail = await UserDetail.findOne({ email: email });
  if (!verifyEmail) {
    res.status(200).json({ message: "Invalid User" });
  } else {
    let verifyPassword = await bcrypt.compare(password, verifyEmail.password);
    if (!verifyPassword) {
      res.status(200).json({ message: "Invalid Password" });
    }
    if (verifyPassword) {
      let jsonToken = jwt.sign(
        { username: verifyEmail.username, email: verifyEmail.email },
        "1aba0daf4b556b706df8b2bcfe0b558bd58e1bf02009af0999048c2e7601a25a9534adeb099b776186ddd9632b597ba342381de7a8281f54bbe8f348a828e17c"
      );
      res.header("Auth", jsonToken).json({ data: jsonToken });
    }
  }
});

const validator = (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log(token);
    const decoded = jwt.verify(
      token,
      "1aba0daf4b556b706df8b2bcfe0b558bd58e1bf02009af0999048c2e7601a25a9534adeb099b776186ddd9632b597ba342381de7a8281f54bbe8f348a828e17c"
    );
    console.log(decoded);
    req.user = decoded; // Store decoded user information in req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

router.get("/all", validator, async (req, res) => {
  try {
    const allUser = await UserDetail.find();
    res.status(200).json({ message: "Success", data: allUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

export default router;
