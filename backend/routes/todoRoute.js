import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/todoController.js";
import { authenticate } from "../middleware/auth.js";

const Router = express.Router();

Router.post("/addtask", authenticate, addTask);
Router.get("/alltasks", authenticate, getTasks);
Router.patch("/update/:id", authenticate, updateTask);
Router.delete("/delete/:id", authenticate, deleteTask);

export default Router;