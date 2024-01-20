import { IUser } from "../../dao/ITables.js";
import { db } from "../../dao/db.js";
import { config } from "dotenv";
import { insertIntoDb } from "../../dao/create.util.js";

config();

// checking if the username already exists:

export async function checkUsernameExists(username: string): Promise<boolean> {
  let users: IUser[] = [];
  try {
    const sql: string = "SELECT username FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    users = result.rows;
    return users.length !== 0;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error checking username existence");
  }
}
// Function to register a new user

async function saveUserInfo(username: string, password: string) {
  const user: IUser = {
    username: username,
    password: password,
    privilege: 0,
  };
  try {
    const result = await insertIntoDb(user, "users");
    return result;
  } catch (err) {
    console.error(err, "Error saving user info.");
  }
}

export async function registerUser(
  username: string,
  password: string
): Promise<any> {
  try {
    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      throw new Error("Username already exists");
    } else {
      const result = await saveUserInfo(username, password);
      return result;
    }
  } catch (error) {
    console.error("Error registering user", error);
    throw new Error("Error registering user");
  }
}
