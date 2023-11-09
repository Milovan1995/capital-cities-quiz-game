import { QueryResult } from "pg";
import { db } from "../dao/db.js";
import { IScore } from "../dao/ITables.js";
import { insertIntoDb } from "../dao/dao.util.js";
import { IGame } from "../dao/ITables.js";

async function getScores(chosenDuration: number): Promise<IScore[]> {
  try {
    const sql: string = `select u.username,g.score as game_score,r.name as region,g.date_played as date_played,d.value as game_duration_seconds
      from scores s, users u, game g, duration d,region r
      where s.duration_id=d.id
      and s.game_id = g.id
      and s.user_id = u.id
      and g.region_id=r.id
      and d.value=${chosenDuration}
      order by g.score desc;`;
    const result: QueryResult<IScore> = await db.query(sql);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving scores");
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
    insertIntoDb(game, "game");
  } catch (err) {
    console.error(err);
  }
}

export { getScores, saveGame };
