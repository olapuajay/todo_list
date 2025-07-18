import jwt from "jsonwebtoken";
const SECRET = "sometxt"

export const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if(!token) return req.status(401).json({ message: "Access denied" });
    token = token.split(" ")[1];
    const user = jwt.verify(token, SECRET);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}