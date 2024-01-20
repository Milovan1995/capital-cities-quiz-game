import { db } from "../../dao/db.js";
import bcrypt from "bcrypt";

export async function verifyUser(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const sql = "SELECT username, password FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    const user = result.rows[0];

    if (!user) {
      // Username doesn't exist
      throw new Error("There is no such username.");
    }

    // Use bcrypt.compare to verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid;
  } catch (error) {
    console.error("Error verifying user", error);
    throw new Error("Error verifying user");
  }
}
