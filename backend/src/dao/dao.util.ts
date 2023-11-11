import { db } from "./db.js";

// INSERTING INTO DB
async function insertIntoDb(
  param: Record<string, number | string>,
  tableName: string
): Promise<void> {
  try {
    const { columns, placeholders, values } = generateInsertQueryParams(param);
    const sql: string = `INSERT INTO ${tableName}(${columns}) VALUES(${placeholders});`;
    const result = await db.query(sql, [...values]);
    console.log(`${tableName} saved: Values: ${[...values]}`);
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

// READING FROM DB

function generateSelectQueryParams(params: Record<string, number | string>) {
  const conditions = Object.keys(params)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");
  const values = Object.values(params);
  return { conditions, values };
}

async function readFromDb<T>(
  param: Record<string, string>,
  tableName: string
): Promise<T[]> {
  try {
    const { conditions, values } = generateSelectQueryParams(param);
    console.log(conditions, values);
    const sql: string = `SELECT * FROM ${tableName} WHERE ${conditions}`;
    const result = await db.query(sql, values);
    return result.rows;
  } catch (error) {
    console.log(error, "error");
    throw new Error(`Error reading from ${tableName}`);
  }
}
async function readSingleValueFromTable<T>(
  columnName: string,
  param: Record<string, string | number>,
  tableName: string
): Promise<T | undefined> {
  try {
    const { conditions, values } = generateSelectQueryParams(param);
    const sql: string = `SELECT ${columnName} FROM ${tableName} WHERE ${conditions}`;
    const result = await db.query(sql, values);
    return result.rows[0] ? result.rows[0][columnName] : undefined;
  } catch (error) {
    console.error(error, "error");
    throw new Error(`Error reading from ${tableName}`);
  }
}

export { insertIntoDb, readFromDb, readSingleValueFromTable };
