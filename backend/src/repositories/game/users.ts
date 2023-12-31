import { IFeedback, IUser } from "../../dao/ITables.js";
import { insertIntoDb } from "../../dao/create.util.js";
import { readValueFromTable } from "../../dao/read.util.js";
import { db } from "../../dao/db.js";

async function saveUserInfo(username: string, password: string) {
  const user: IUser = {
    username: username,
    password: password,
  };
  try {
    insertIntoDb(user, "users");
  } catch (err) {
    console.error(err, "Error saving user info.");
  }
}

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
      and u.username = $1;`;
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

export { saveUserInfo, insertUserFeedback, getUserFeedback };
