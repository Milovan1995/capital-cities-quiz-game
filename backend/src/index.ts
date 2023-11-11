import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { ICapital } from "./dao/ITables.js";
import { getCapitals } from "./game/capitals.js";
import { dbInfo } from "./dao/db.js";

config();
const app = express();
const port = dbInfo.appPort;
(async () => {
  let quiz: ICapital[] = [];

  try {
    quiz = await getCapitals();
    console.log(quiz);
  } catch (error) {
    console.error("Error getting capitals", error);
  }
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
