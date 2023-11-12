import express from "express";
import { checkUsernameExists, registerUser } from "../auth/registration.js";

const userRoutes = express.Router();

userRoutes.get("/api/check-username", async (req, res) => {
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

userRoutes.post("/api/register-user", async (req, res) => {
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

export { userRoutes };
