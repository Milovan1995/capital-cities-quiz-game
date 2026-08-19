import express from "express";
import scoreControllers from "../controllers/scoreControllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const scoreRoutes = express.Router();

scoreRoutes.get("/duration/:duration", scoreControllers.recieveScores);

scoreRoutes.get(
  "/highscores/duration/:duration/limit/:limit",
  scoreControllers.recieveHighScores
);

scoreRoutes.post(
  "/save-game",
  authMiddleware,
  scoreControllers.saveGameScore
);

export { scoreRoutes };
