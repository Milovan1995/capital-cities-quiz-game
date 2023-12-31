import { readValueFromTable } from "../../dao/read.util.js";
import { ICapital } from "../../dao/ITables.js";

async function getCapitals(regionId?: number): Promise<ICapital[]> {
  try {
    if (regionId) {
      return await readValueFromTable<ICapital>("capitals", "*", {
        region_id: `${regionId}`,
      });
    } else {
      return await readValueFromTable<ICapital>("capitals", "*");
    }
  } catch (error) {
    console.error(error, "error");
  }
}

export { getCapitals };
