import { readFromDb } from "../dao/read.util.js";
import { ICapital } from "../dao/ITables.js";

async function getCapitals(regionId: number): Promise<ICapital[]> {
  try {
    return await readFromDb<ICapital>(
      {
        region_id: `${regionId}`,
      },
      "capitals"
    );
  } catch (error) {
    console.error(error, "error");
  }
}

export { getCapitals };
