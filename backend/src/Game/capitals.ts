import { readFromDb } from "../dao/read.util.js";
import { ICapital } from "../dao/ITables.js";
import { regionNumber } from "../dao/region.js";

async function getCapitals(): Promise<ICapital[]> {
  try {
    return await readFromDb<ICapital>(
      {
        region_id: `${regionNumber}`,
      },
      "capitals"
    );
  } catch (error) {
    console.error(error, "error");
  }
}

export { getCapitals };
