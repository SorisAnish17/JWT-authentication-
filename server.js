import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoute.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/", userRoutes);

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/userAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Server listening
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server successfully connected at http://localhost:${PORT}`);
});
