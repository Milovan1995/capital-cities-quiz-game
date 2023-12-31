import { IUser } from "../../dao/ITables.js";
import { db } from "../../dao/db.js";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { saveUserInfo } from "../game/users.js";

config();

// checking if the username already exists:

export async function checkUsernameExists(username: string): Promise<boolean> {
  let users: IUser[] = [];
  try {
    const sql: string = "SELECT username FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    users = result.rows;
    return users.length === 0 ? false : true;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error checking username existence");
  }
}
// Function to register a new user
export async function registerUser(
  username: string,
  password: string
): Promise<void> {
  try {
    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      throw new Error("Username already exists");
    } else {
      const saltRounds: number = 10;
      const hashedPassword: string = await bcrypt.hash(password, saltRounds);
      await saveUserInfo(username, hashedPassword);
    }
  } catch (error) {
    console.error("Error registering user", error);
    throw new Error("Error registering user");
  }
}
