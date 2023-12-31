import { IScore } from "../dao/ITables.js";
import {
  saveGame,
  getHighscores,
  getScores,
} from "../repositories/game/scores.js";

const getAllScores = async (duration: number) => {
  try {
    const scores: IScore[] = await getScores(duration);
    return scores;
  } catch (error) {
    throw new Error("Internal server error while getting all scores");
  }
};

const getANumberOfHighscores = async (duration: number, limit: number) => {
  try {
    const highscores: IScore[] = await getHighscores(duration, limit);
    return highscores;
  } catch (error) {
    throw new Error("Internal server error while getting highscores.");
  }
};

const saveGameScore = async (
  userId: number,
  score: number,
  durationId: number,
  regionId: number
) => {
  try {
    await saveGame(userId, score, durationId, regionId);
    return true;
  } catch (e) {
    throw new Error("Internal error while saving game info");
  }
};
export default { getANumberOfHighscores, getAllScores, saveGameScore };
