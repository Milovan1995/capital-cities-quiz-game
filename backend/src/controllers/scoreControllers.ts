import { Request, Response } from "express";
import { IAuthTokenPayload, IScore } from "../dao/ITables.js";
import scoreServices from "../services/scoreServices.js";

type AuthenticatedRequest = Request & { auth?: IAuthTokenPayload };

const recieveScores = async (req: Request, res: Response) => {
  const { duration } = req.params;
  const parsedDuration = parseInt(duration, 10);

  if (Number.isNaN(parsedDuration)) {
    return res.status(400).json({ error: "Valid duration is required." });
  }

  try {
    const scores: IScore[] = await scoreServices.getAllScores(parsedDuration);
    return res.json(scores);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const recieveHighScores = async (req: Request, res: Response) => {
  const { duration, limit } = req.params;
  const parsedDuration = parseInt(duration, 10);
  const parsedLimit = parseInt(limit, 10);

  if (Number.isNaN(parsedDuration) || Number.isNaN(parsedLimit)) {
    return res
      .status(400)
      .json({ error: "Valid duration and limit are required." });
  }

  try {
    const highscores: IScore[] = await scoreServices.getANumberOfHighscores(
      parsedDuration,
      parsedLimit
    );
    return res.json(highscores);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const saveGameScore = async (req: Request, res: Response) => {
  const auth = (req as AuthenticatedRequest).auth;
  const userId = Number(req.body.userId ?? auth?.userId);
  const score = Number(req.body.score);
  const durationId = Number(req.body.durationId);
  const rawRegionId = req.body.regionId;
  const regionId =
    rawRegionId === undefined || rawRegionId === null || rawRegionId === ""
      ? undefined
      : Number(rawRegionId);

  if (
    Number.isNaN(userId) ||
    Number.isNaN(score) ||
    Number.isNaN(durationId) ||
    (regionId !== undefined && Number.isNaN(regionId))
  ) {
    return res.status(400).json({
      error: "User ID, score, and duration ID are required.",
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
