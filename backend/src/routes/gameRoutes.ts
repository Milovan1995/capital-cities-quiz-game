import { Request, Response } from "express";
import express from "express";
import { getCapitals } from "../game/capitals.js";

// Define gameRoutes
const gameRoutes = express.Router();

// Endpoint to get capitals for a specific region
gameRoutes.get(
  "/capitals/:regionId",
  async (req: Request, res: Response) => {
    const regionId = parseInt(req.params.regionId, 10); // Parse the regionId from the URL

    try {
      const capitals = await getCapitals(regionId);
      return res.json({ capitals });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
);

export { gameRoutes };

