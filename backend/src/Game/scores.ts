import { QueryResult } from "pg";
import { db } from "../daoUtil/db.js";
import { IScore } from "../daoUtil/ITables.js";

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
  durationID: number,
  regionId: number
): Promise<void> {
  try {
    const sql: string = `INSERT INTO game(user_id,score,duration_id,region_id,date_played) VALUES($1,$2,$3,$4,to_timestamp(${
      Date.now() / 1000.0
    }));`;
    const result = await db.query(sql, [userId, score, durationID, regionId]);
    console.log("Game saved:" + result.rows);
  } catch (error) {
    console.error("Error saving game", error);
    throw new Error("Error saving game");
  }
}

export { getScores, saveGame };
