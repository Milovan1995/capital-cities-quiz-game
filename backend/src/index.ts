import express from "express";
import { appConfig } from "./config.js";
import { db, dbInfo } from "./dao/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { scoreRoutes } from "./routes/scoreRoutes.js";
import { gameRoutes } from "./routes/gameRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || appConfig.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS."));
    },
  })
);
app.use(express.static("public"));

const port = dbInfo.appPort;

app.get("/health", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    return res.json({ status: "ok" });
  } catch {
    return res.status(503).json({ status: "unavailable" });
  }
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/scores", scoreRoutes);
app.use("/game", gameRoutes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const errorName =
    typeof error === "object" && error !== null && "name" in error
      ? String(error.name)
      : "";
  const isMalformedJson = error instanceof SyntaxError && "body" in error;
  if (isMalformedJson) return res.status(400).json({ error: "Invalid JSON." });
  if (errorName === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
  console.error("Unhandled request error", error);
  return res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
