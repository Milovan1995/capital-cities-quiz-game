import express from "express";
import { config } from "dotenv";
import { dbInfo } from "./dao/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { scoreRoutes } from "./routes/scoreRoutes.js";
import { gameRoutes } from "./routes/gameRoutes.js";
import cors from "cors";
config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true })); Nije potrebno za noviji node, express.json radi posao
app.use(express.static("public"));

const port = dbInfo.appPort;

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/scores", scoreRoutes);
app.use("/game", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
