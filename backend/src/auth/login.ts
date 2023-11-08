import { db } from "../daoUtil/db.js";
import bcrypt from "bcrypt";

export async function verifyUser(username: string, password: string) {
  try {
    const sql = "SELECT username, password FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    const user = result.rows[0];

    if (!user) {
      // Username doesn't exist
      return false;
    }

    // Use bcrypt.compare to verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Password is valid
      return true;
    } else {
      // Password is invalid
      console.log("Password is invalid");
      return false;
    }
  } catch (error) {
    console.error("Error verifying user", error);
    throw new Error("Error verifying user");
  }
}
