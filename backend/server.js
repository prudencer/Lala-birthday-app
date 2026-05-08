import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Lala Birthday Backend is running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });