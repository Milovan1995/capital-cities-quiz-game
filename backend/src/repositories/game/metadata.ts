import { IDuration, IRegion } from "../../dao/ITables.js";
import { readValueFromTable } from "../../dao/read.util.js";

async function getRegions(): Promise<IRegion[]> {
  const regions = await readValueFromTable<IRegion>(
    "region",
    ["id", "name"]
  );
  return regions ?? [];
}

async function getDurations(): Promise<IDuration[]> {
  const durations = await readValueFromTable<IDuration>(
    "duration",
    ["id", "value"]
  );
  return durations ?? [];
}

export { getRegions, getDurations };
