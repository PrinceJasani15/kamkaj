import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; 
import noteRoutes from "./routes/noteRoutes.js"; 
import eventRoutes from "./routes/eventRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { ensureUserScopedSchema } from "./config/ensureUserScopedSchema.js";

dotenv.config();

console.log("SERVER USER:", process.env.DB_USER);
console.log("SERVER PASS:", process.env.DB_PASSWORD);

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("KamKaj Backend Running 🚀");
});

const startServer = async () => {
  try {
    await ensureUserScopedSchema();

    app.listen(4000, () => {
      console.log("Server Running on Port 4000");
    });
  } catch (error) {
    console.error(
      "Failed to prepare database schema:",
      error.message
    );
    process.exit(1);
  }
};

startServer();
