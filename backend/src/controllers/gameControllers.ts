import { Request, Response } from "express";
import { ICapital } from "../dao/ITables.js";
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

export default { getCapitals };
