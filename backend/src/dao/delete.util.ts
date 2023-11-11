import { db } from "./db.js";

async function deleteFromDb(
  tableName: string,
  condition: string
): Promise<void> {
  try {
    const sql: string = `DELETE FROM ${tableName} WHERE ${condition};`;
    const result = await db.query(sql);
    console.log(`${tableName} records deleted`);
  } catch (error) {
    console.error(`Error deleting from ${tableName}`, error);
    throw new Error(`Error deleting from ${tableName}`);
  }
}

export { deleteFromDb };
