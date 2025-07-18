import todoModel from "../models/todo.js";

export const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;
    const task = await todoModel.create({ title, user: userId });
    res.status(201).json({ message: "Task added successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await todoModel.find().populate("user", "name email");
    res.status(200).json({ message: "Tasks fetched successfully", tasks });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}