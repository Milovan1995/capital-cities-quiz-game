import { ICapital } from "../dao/ITables.js";
import { getCapitals } from "../repositories/game/capitals.js";

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
export default { recieveCapitals };
