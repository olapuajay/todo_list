import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 8001;

mongoose.connect(`mongodb://localhost:27017/todo`).then(() => {
  app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    console.log("MongoDB connected");
  });
})

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
