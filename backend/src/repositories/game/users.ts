import {
  IFeedback,
  IUser,
  IUserProfile,
  IUserStats,
} from "../../dao/ITables.js";
import { insertIntoDb } from "../../dao/create.util.js";
import { readValueFromTable } from "../../dao/read.util.js";
import { db } from "../../dao/db.js";

async function insertUserFeedback(
  user: string,
  postedComment: string
): Promise<void> {
  try {
    const userId = await readValueFromTable<Record<string, number>>(
      "users",
      "id",
      {
        username: user,
      }
    );
    const datePosted: string = new Date().toISOString().split("T")[0];
    if (userId) {
      const chosenUserId: number = userId[0].id;
      await insertIntoDb(
        {
          user_id: chosenUserId,
          comment: postedComment,
          date_created: datePosted,
        },
        "feedback"
      );
    } else {
      console.error("Error");
      throw new Error("Error saving feedback");
    }
  } catch (error) {
    console.error(error, "Error saving user feedback");
  }
}

async function getUserFeedback(user?: string): Promise<IFeedback[]> {
  try {
    if (!!user) {
      const sql: string = `
      SELECT f.comment, f.date_created, u.username
      FROM feedback f
      INNER JOIN users u ON f.user_id = u.id
      WHERE u.username = $1;`;
      const result = await db.query(sql, [user]);
      return result.rows;
    } else {
      const sql: string = `
      SELECT f.comment, f.date_created, u.username
      FROM feedback f
      INNER JOIN users u ON f.user_id = u.id;`;
      const result = await db.query(sql);
      return result.rows;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getUserProfileByUsername(
  username: string
): Promise<IUserProfile | undefined> {
  const sql = `
    SELECT id, username, privilege
    FROM users
    WHERE username = $1;
  `;
  const result = await db.query<IUserProfile>(sql, [username]);
  return result.rows[0];
}

async function getUserGameStatsByUsername(
  username: string
): Promise<IUserStats | undefined> {
  const sql = `
    SELECT
      COUNT(g.id)::int AS total_games,
      COALESCE(MAX(g.score), 0)::int AS best_score,
      COALESCE(ROUND(AVG(g.score)), 0)::int AS average_score,
      MAX(g.date_played)::text AS last_played
    FROM users u
    LEFT JOIN game g ON g.user_id = u.id
    WHERE u.username = $1
    GROUP BY u.id;
  `;
  const result = await db.query<IUserStats>(sql, [username]);
  return result.rows[0];
}

export {
  insertUserFeedback,
  getUserFeedback,
  getUserProfileByUsername,
  getUserGameStatsByUsername,
};
