import { IUser } from "../../dao/ITables.js";
import { db } from "../../dao/db.js";

export async function verifyUser(
  username: string,
  password: string
): Promise<IUser> {
  try {
    const sql = "SELECT username, password FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    const user = result.rows[0];

    if (!user) {
      // Username doesn't exist
      throw new Error("There is no such username.");
    }
    return user;
  } catch (error) {
    console.error("Error verifying user", error);
    throw new Error("Error verifying user");
  }
}
