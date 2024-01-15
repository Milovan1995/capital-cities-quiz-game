import { db } from "./db.js";

// Function I will use to be able to inject my key value pairs into the sql query. Reusability purposes.

function generateSelectQueryParams(params: Record<string, number | string>) {
  const conditions = Object.keys(params)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");
  const values = Object.values(params);
  return { conditions, values };
}
/// Generic function for reading values from table . table name argument is required,
//column/columns are required, if object 'param' is passed, the query will change
// and add 'WHERE KEY = VALUE' to the sql query i'm sending, if no object is passed
//as an argument then the query won't have 'WHERE...' part
async function readValueFromTable<T>(
  tableName: string,
  columnName: string | string[],
  param?: Record<string, string | number>,
  joinTable?: string
): Promise<T[] | undefined> {
  try {
    const selectedColumns: string = Array.isArray(columnName)
      ? columnName.join(", ")
      : columnName;
    const joinParam = !!joinTable
      ? `INNER JOIN ${joinTable} on ${joinTable}.id = ${tableName}.${joinTable}_id`
      : "";
    if (param) {
      const { conditions, values } = generateSelectQueryParams(param);
      const sql = `SELECT ${selectedColumns} FROM ${tableName} ${joinParam} WHERE ${conditions}`;
      const result = await db.query(sql, values);
      return result.rows[0] ? result.rows : undefined;
    } else {
      const sql = `SELECT ${selectedColumns} FROM ${tableName} ${joinParam}`;
      const result = await db.query(sql);
      return result.rows;
    }
  } catch (error) {
    console.error(error, "error");
    throw new Error(`Error reading from ${tableName}`);
  }
}
export { readValueFromTable };
