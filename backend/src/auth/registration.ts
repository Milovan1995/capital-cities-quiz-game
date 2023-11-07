import { IUser } from "../daoUtil/ITables.js";
import { db } from "../daoUtil/db.js";
import { config } from "dotenv";

config();

// Function to check if a username already exists
export async function checkUsernameExists(username: string) {
  let users: IUser[] = [];
  try {
    const sql = "SELECT username FROM users WHERE username = $1";
    const result = await db.query(sql, [username]);
    users = result.rows;
    return users.length === 0 ? false : true;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error checking username existence");
  }
}

// Example usage
let username: string = "some name";
checkUsernameExists(username)
  .then((userExists) => {
    console.log(`User ${username} exists: ${userExists}`);
  })
  .catch((error) => {
    console.error("Error checking username existence", error);
  });
