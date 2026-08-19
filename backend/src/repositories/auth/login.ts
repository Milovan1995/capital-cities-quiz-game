import { db } from "../../dao/db.js";
import bcrypt from "bcrypt";

export async function verifyUser(
  username: string,
  password: string
): Promise<any> {
  try {
    const sql =
      "SELECT id, username, password, privilege FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    const user = result.rows[0];

    if (!user) return [false, undefined];

    // Use bcrypt.compare to verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    return [isPasswordValid, user];
  } catch (error) {
    console.error("Error verifying user", error);
    throw new Error("Error verifying user");
  }
}
