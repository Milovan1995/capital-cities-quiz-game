import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { dbInfo } from "./dao/db.js";
import { authRoutes } from "./routes/authRoutes.js";
config();
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = dbInfo.appPort;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
