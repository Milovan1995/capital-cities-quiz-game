import { db } from "./db.js";
import { ICapital } from "./ITables.js";
import {regionNumber} from "./region.js";

async function getCapitals(): Promise<ICapital[]> {
  try {
    const sql = `SELECT * FROM capitals WHERE region_id = ${regionNumber}`;
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Error retrieving capitals");
  }
}

export { getCapitals };
