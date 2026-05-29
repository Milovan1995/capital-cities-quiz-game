import { Request, Response } from "express";
import { ICapital, IDuration, IRegion } from "../dao/ITables.js";
import gameServices from "../services/gameServices.js";

const getCapitals = async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const parsedRegionId = regionId ? parseInt(regionId, 10) : undefined;

  try {
    let capitals: ICapital[];
    if (parsedRegionId !== undefined) {
      capitals = await gameServices.recieveCapitals(parsedRegionId);
    } else {
      capitals = await gameServices.recieveCapitals();
    }
    return res.json({ capitals });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getRegions = async (_req: Request, res: Response) => {
  try {
    const regions: IRegion[] = await gameServices.recieveRegions();
    return res.json({ regions });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getDurations = async (_req: Request, res: Response) => {
  try {
    const durations: IDuration[] = await gameServices.recieveDurations();
    return res.json({ durations });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getGameConfig = async (_req: Request, res: Response) => {
  try {
    const [regions, durations] = await Promise.all([
      gameServices.recieveRegions(),
      gameServices.recieveDurations(),
    ]);
    return res.json({ regions, durations });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default { getCapitals, getRegions, getDurations, getGameConfig };
