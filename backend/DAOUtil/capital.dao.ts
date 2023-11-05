import db from "./db.js";
import { Capital } from "./ITables.js";

async function getCapitals(): Promise<Capital[]> {
  try {
    const sql = "SELECT * FROM capitals";
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving capitals");
  }
}

export { getCapitals };
