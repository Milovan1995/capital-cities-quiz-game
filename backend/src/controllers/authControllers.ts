import { Request, Response } from "express";
import authServices from "../services/authServices.js";

const checkIfUserValid = async (req: Request, res: Response) => {
  const username =
    typeof req.body.username === "string" ? req.body.username.trim() : "";
  const password =
    typeof req.body.password === "string" ? req.body.password : "";
  if (!username || !password || username.length > 45) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  try {
    const isUserValidResponse: Record<string, string | boolean> =
      await authServices.authenticateUser(username, password);

    if (isUserValidResponse.success) {
      return res.send(isUserValidResponse);
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password." });
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

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password ||
    username.trim().length > 45
  ) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const usernameValue = username.trim();

  try {
    const result = await authServices.registerNewUser(usernameValue, password);
    if (!!result) {
      return res.send(result);
    }
  } catch (error) {
    if (error instanceof Error && error.message === "USERNAME_EXISTS") {
      return res.status(409).json({ error: "Username already exists." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default { checkIfUserValid, registerNewUser, checkUsernameExistence };
