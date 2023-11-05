import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { getCapitals } from "./DAOUtil/capital.dao.js";

config();
const app = express();
const port = process.env.APP_PORT;
(async () => {
  let quiz = [];

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
