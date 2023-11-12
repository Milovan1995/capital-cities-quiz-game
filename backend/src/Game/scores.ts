import { QueryResult } from "pg";
import { db } from "../dao/db.js";
import { IScore } from "../dao/ITables.js";
import { insertIntoDb } from "../dao/create.util.js";
import { IGame } from "../dao/ITables.js";

async function getScores(chosenGameDuration: number): Promise<IScore[]> {
  try {
    const sql: string = `
      SELECT g.score AS score, u.username AS username, r.name AS region, d.value AS game_length_seconds, g.date_played AS date_played
      FROM game g
      INNER JOIN users u ON g.user_id = u.id
      INNER JOIN region r ON g.region_id = r.id
      INNER JOIN duration d ON g.duration_id = d.id
      WHERE d.value = $1
      ORDER BY g.score DESC;
    `;
    const result: QueryResult<IScore> = await db.query(sql, [
      chosenGameDuration,
    ]);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving scores");
  }
}
async function getHighscores(
  chosenGameDuration: number,
  limit: number
): Promise<IScore[]> {
  try {
    const sql: string = `
      SELECT g.score AS score, u.username AS username, r.name AS region, d.value AS game_length_seconds, g.date_played AS date_played
      FROM game g
      INNER JOIN users u ON g.user_id = u.id
      INNER JOIN region r ON g.region_id = r.id
      INNER JOIN duration d ON g.duration_id = d.id
      WHERE d.value = $1
      LIMIT = $2
      ORDER BY g.score DESC;
    `;
    const result: QueryResult<IScore> = await db.query(sql, [
      chosenGameDuration,
      limit,
    ]);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving highscores");
  }
}

async function saveGame(
  userId: number,
  score: number,
  durationId: number,
  regionId: number
) {
  const game: IGame = {
    user_id: userId,
    score: score,
    duration_id: durationId,
    region_id: regionId,
    date_played: new Date().toISOString().split("T")[0],
  };

  try {
    const gameId: number = await insertIntoDb(game, "game");
    console.log(`Game under id ${gameId} saved.`);
  } catch (err) {
    console.error("error", err);
  }
}

export { getScores, saveGame, getHighscores };
