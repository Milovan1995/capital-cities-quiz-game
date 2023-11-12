import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { dbInfo } from "./dao/db.js";
import { verifyUser } from "./auth/login.js";

config();
const app = express();
app.use(express.json());

const port = dbInfo.appPort;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
