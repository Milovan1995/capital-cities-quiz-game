import { db } from "./db.js";

async function updateInDb(
  tableName: string,
  updateParams: Record<string, number | string>,
  condition: string
): Promise<void> {
  try {
    const { setClause, values } = generateUpdateQueryParams(updateParams);
    const sql: string = `UPDATE ${tableName} SET ${setClause} WHERE ${condition};`;
    const result = await db.query(sql, [...values]);
    console.log(`${tableName} updated: Values: ${[...values]}`);
  } catch (error) {
    console.error(`Error updating ${tableName}`, error);
    throw new Error(`Error updating ${tableName}`);
  }
}

function generateUpdateQueryParams(params: Record<string, number | string>) {
  const setClause = Object.keys(params)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(params);
  return { setClause, values };
}

export { updateInDb };
