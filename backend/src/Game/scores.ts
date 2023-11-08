import { db } from "../daoUtil/db.js";
import { IScore } from "../daoUtil/ITables.js";

async function getScores(chosenDuration: number): Promise<IScore[]> {
  let gameDuration = chosenDuration;
  try {
    const sql = `select u.username,g.score as game_score,r.name as region,g.date_played as date_played,d.value as game_duration_seconds
      from scores s, users u, game g, duration d,region r
      where s.duration_id=d.id
      and s.game_id = g.id
      and s.user_id = u.id
      and g.region_id=r.id
      and d.value=${gameDuration}
      order by g.score desc;`;
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving capitals");
  }
}

export { getScores };
