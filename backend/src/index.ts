import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { dbInfo } from "./dao/db.js";
import { verifyUser } from "./auth/login.js";
import { registerUser, checkUsernameExists } from "./auth/registration.js";

config();
const app = express();
app.use(express.json());

const port = dbInfo.appPort;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// User verification
app.post("/api/verify-user", async (req, res) => {
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

// Endpoint to check if a username already exists
app.get("/api/check-username", async (req, res) => {
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

// Endpoint to register a new user
app.post("/api/register-user", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
