import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { dbInfo } from "./dao/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { scoreRoutes } from "./routes/scoreRoutes.js";
import { gameRoutes } from "./routes/gameRoutes.js";
config();

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = dbInfo.appPort;

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/game", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
