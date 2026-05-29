import { ICapital, IDuration, IRegion } from "../dao/ITables.js";
import { getCapitals } from "../repositories/game/capitals.js";
import { getDurations, getRegions } from "../repositories/game/metadata.js";

export const recieveCapitals = async (regionId?: number) => {
  let capitals: ICapital[] = [];
  if (!!regionId) {
    try {
      capitals = await getCapitals(regionId);
      return capitals;
    } catch (e) {
      throw new Error("Internal server error while recieving capitals");
    }
  } else {
    try {
      capitals = await getCapitals();
      return capitals;
    } catch (e) {
      throw new Error("Internal server error while recieving capitals");
    }
  }
};

const recieveRegions = async (): Promise<IRegion[]> => {
  try {
    return await getRegions();
  } catch (e) {
    throw new Error("Internal server error while recieving regions");
  }
};

const recieveDurations = async (): Promise<IDuration[]> => {
  try {
    return await getDurations();
  } catch (e) {
    throw new Error("Internal server error while recieving durations");
  }
};

export default { recieveCapitals, recieveRegions, recieveDurations };
