import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "sometxt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "User already exists!" });
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedpwd };
    const result = await userModel.create(user);

    res.status(201).json({ message: "Registration successfull!", details: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if(isMatch) {
        const userObj = { id: existingUser._id, name: existingUser.name, email: existingUser.email };
        const token = jwt.sign(userObj, SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Logged-in successfully!", user: userObj, token });
      } else {
        res.status(404).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}