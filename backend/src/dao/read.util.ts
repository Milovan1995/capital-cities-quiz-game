import { db } from "./db.js";

// READING FROM DB
function generateSelectQueryParams(params: Record<string, number | string>) {
  const conditions = Object.keys(params)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");
  const values = Object.values(params);
  return { conditions, values };
}

async function readValueFromTable<T>(
  tableName: string,
  columnName: string | string[],
  param?: Record<string, string | number>
): Promise<T[] | undefined> {
  try {
    const selectedColumns: string = Array.isArray(columnName)
      ? columnName.join(", ")
      : columnName;
    if (param) {
      const { conditions, values } = generateSelectQueryParams(param);
      const sql: string = `SELECT ${selectedColumns} FROM ${tableName} WHERE ${conditions}`;
      const result = await db.query(sql, values);
      return result.rows[0] ? result.rows : undefined;
    } else {
      const sql: string = `SELECT ${selectedColumns} FROM ${tableName}`;
      const result = await db.query(sql);
      return result.rows;
    }
  } catch (error) {
    console.error(error, "error");
    throw new Error(`Error reading from ${tableName}`);
  }
}
export { readValueFromTable };
