import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { config } from "dotenv";
config();
const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

db.connect();

let quiz = [];

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
    console.log(quiz[0]);
  }
  db.end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.sendFile("index.html", { root: "./" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
