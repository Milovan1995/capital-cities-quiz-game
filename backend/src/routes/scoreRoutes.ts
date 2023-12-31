import express from "express";
import scoreControllers from "../controllers/scoreControllers.js";

const scoreRoutes = express.Router();

scoreRoutes.get("/duration/:duration", scoreControllers.recieveScores);

scoreRoutes.get(
  "/highscores/duration/:duration/limit/:limit",
  scoreControllers.recieveHighScores
);

scoreRoutes.post("/save-game", scoreControllers.saveGameScore);

export { scoreRoutes };
