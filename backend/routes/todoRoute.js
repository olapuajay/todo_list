import express from "express";
import { addTask, getTasks } from "../controllers/todoController.js";
import { authenticate } from "../middleware/auth.js";

const Router = express.Router();

Router.post("/addtask", authenticate, addTask);
Router.get("/alltasks", authenticate, getTasks);

export default Router;