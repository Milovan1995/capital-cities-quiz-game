import { Request, Response } from "express";
import { IScore } from "../dao/ITables.js";
import scoreServices from "../services/scoreServices.js";

const recieveScores = async (req: Request, res: Response) => {
  const { duration } = req.params;
  try {
    const scores: IScore[] = await scoreServices.getAllScores(
      parseInt(duration, 10)
    );
    return res.json(scores);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const recieveHighScores = async (req: Request, res: Response) => {
  const { duration, limit } = req.params;
  try {
    const highscores: IScore[] = await scoreServices.getANumberOfHighscores(
      parseInt(duration, 10),
      parseInt(limit, 10)
    );
    return res.json(highscores);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const saveGameScore = async (req: Request, res: Response) => {
  const { userId, score, durationId, regionId } = req.body;

  if (!userId || !score || !durationId || !regionId) {
    return res.status(400).json({
      error: "User ID, score, duration ID, and region ID are required.",
    });
  }

  try {
    const isSavedSuccessfully: boolean = await scoreServices.saveGameScore(
      userId,
      score,
      durationId,
      regionId
    );
    if (isSavedSuccessfully) {
      return res.json({ message: "Game saved successfully." });
    } else {
      return res.json({ message: "Something went wrong while saving game" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
export default { recieveScores, recieveHighScores, saveGameScore };
