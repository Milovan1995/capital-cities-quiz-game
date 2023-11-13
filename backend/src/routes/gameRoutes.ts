import { Request, Response } from "express";
import express from "express";
import { getCapitals } from "../game/capitals.js";
import { ICapital } from "../dao/ITables.js";

const gameRoutes = express.Router();

gameRoutes.get("/capitals/:regionId?", async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const parsedRegionId = regionId ? parseInt(regionId, 10) : undefined;

  try {
    let capitals: ICapital[];
    if (parsedRegionId !== undefined) {
      capitals = await getCapitals(parsedRegionId);
    } else {
      capitals = await getCapitals();
    }
    return res.json({ capitals });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

export { gameRoutes };
