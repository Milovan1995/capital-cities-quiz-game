import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

loadEnv();
const moduleDir = dirname(fileURLToPath(import.meta.url));
const envCandidates = [
  resolve(moduleDir, "../../.env"),
  resolve(moduleDir, "../.env"),
  resolve(process.cwd(), ".env"),
];
const projectEnv = envCandidates.find((candidate) => existsSync(candidate));
if (projectEnv) loadEnv({ path: projectEnv });

const jwtSecret = process.env.JWT_SECRET?.trim();
if (!jwtSecret) {
  throw new Error(
    "JWT_SECRET is required. Add it to the project .env before starting the backend."
  );
}

export const appConfig = {
  jwtSecret,
  port: Number.parseInt(process.env.APP_PORT || "3000", 10),
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:4200,http://127.0.0.1:4200")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
