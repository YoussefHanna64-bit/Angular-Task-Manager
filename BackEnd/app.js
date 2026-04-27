import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";
import { handleError } from "./middleware/errorHandling.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.use(handleError);

app.use((req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
