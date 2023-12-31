import express from "express";
import { checkUsernameExists, registerUser } from "../repositories/auth/registration.js";
import { getUserFeedback, insertUserFeedback } from "../repositories/game/users.js";
import { IFeedback } from "../dao/ITables.js";
const userRoutes = express.Router();

userRoutes.get("/check-username", async (req, res) => {
  // Route for checking username existence
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
    const usernameExists = await checkUsernameExists(username);

    return res.json({ exists: usernameExists });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

userRoutes.post("/register-user", async (req, res) => {
  // Route for registering a new user
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  let usernameValue = username;
  if (Array.isArray(username)) {
    usernameValue = username[0];
  }

  if (typeof usernameValue !== "string") {
    return res.status(400).json({ error: "Invalid username format." });
  }

  try {
    await registerUser(usernameValue, password);
    return res.json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

userRoutes.post("/insert-user-feedback", async (req, res) => {
  const { user, postedComment } = req.body;

  if (!user || !postedComment) {
    return res.status(400).json({ error: "User and comment are required." });
  }

  try {
    await insertUserFeedback(user, postedComment);
    return res.json({ message: "Feedback saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

import { Request, Response } from "express";

userRoutes.get("/user-feedback", async (req: Request, res: Response) => {
  const user = req.query.user as string | undefined;

  try {
    let feedback: IFeedback[] = [];

    if (user) {
      // If 'user' is provided, fetch user-specific feedback
      feedback = await getUserFeedback(user);
    } else {
      // If 'user' is not provided, fetch all feedback
      feedback = await getUserFeedback();
    }

    return res.json({ feedback });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

export { userRoutes };
