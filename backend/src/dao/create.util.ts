import { db } from "./db.js";

// INSERTING INTO DB
async function insertIntoDb(
  param: Record<string, number | string>,
  tableName: string
): Promise<number> {
  try {
    const { columns, placeholders, values } = generateInsertQueryParams(param);
    const sql: string = `INSERT INTO ${tableName}(${columns}) VALUES(${placeholders}) RETURNING id;`;
    const result = await db.query(sql, [...values]);
    console.log(`${tableName} saved: Values: ${[...values]}`);
    if (result.rows[0] && result.rows[0].id) {
      const insertedId = result.rows[0].id;
      console.log(`${tableName} saved with ID ${insertedId}`);
      return insertedId;
    }
  } catch (error) {
    console.error(`Error saving ${tableName}`, error);
    throw new Error(`Error saving ${tableName}`);
  }
}

function generateInsertQueryParams(param: Record<string, number | string>) {
  const columns = Object.keys(param).join(",");
  const values = Object.values(param);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(",");
  return { columns, placeholders, values };
}

export { insertIntoDb };
