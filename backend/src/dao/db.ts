import pg from "pg";
import { EnvVars } from "./ITables.js";
import "../config.js";


const dbInfo = new EnvVars(
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_DATABASE,
  parseInt(process.env.DB_PORT || "5432", 10),
  parseInt(process.env.APP_PORT || "3000", 10)
);

const db = new pg.Pool({
  user: dbInfo.user,
  host: dbInfo.host,
  database: dbInfo.db,
  password: dbInfo.password,
  port: dbInfo.dbPort,
});

export { db, dbInfo };
