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
const checkUsernameExistence = async (req: Request, res: Response) => {
  let usernameParam = req.query.username;

  if (!usernameParam) {
    return res.status(400).json({ error: "Username is required." });
  }

  let username = usernameParam;
  if (Array.isArray(usernameParam)) {
    username = usernameParam[0];
  }

  if (typeof username !== "string") {
    return res.status(400).json({ error: "Invalid username format." });
  }

  try {
    const usernameExists = await authServices.checkIfUsernameExists(username);

    return res.json({ exists: usernameExists });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const registerNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  let usernameValue: string = username;
  if (Array.isArray(username)) {
    usernameValue = username[0];
  }

  if (typeof usernameValue !== "string") {
    return res.status(400).json({ error: "Invalid username format." });
  }

  try {
    const userRegistered: boolean = await authServices.registerNewUser(
      usernameValue,
      password
    );
    if (userRegistered) {
      return res.json({ message: "User registered successfully." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default { checkIfUserValid, registerNewUser, checkUsernameExistence };
