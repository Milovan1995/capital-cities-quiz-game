import { Request, Response } from "express";
import authServices from "../services/authServices.js";

const checkIfUserValid = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const isUserValid = await authServices.verifyUser(username, password);

    if (isUserValid) {
      return res.json({ message: "User verified successfully." });
    } else {
      return res.status(401).json({ error: "Authentication failed." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default { checkIfUserValid };
