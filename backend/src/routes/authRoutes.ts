import express from "express";
import { verifyUser } from "../auth/login.js";

const authRoutes = express.Router();

authRoutes.post("/verify-user", async (req, res) => {
  // Authentication-related route handling
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const isUserValid = await verifyUser(username, password);

    if (isUserValid) {
      return res.json({ message: "User verified successfully." });
    } else {
      return res.status(401).json({ error: "Authentication failed." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

export { authRoutes };
