import { MINDAT_KEYS_MAP } from "@/lib/constants";
import { capitalize, getRange } from "@utils";


export const getPhysicalProperties = (data) => {
  // Returns a clean object with the physical properties
  let cleanData = {};
  if (!data) return null;
  const { colour, diapheny, dmeas, dmeas2, hmin, hmax, tenacity, cleavage, luminescence, lustre, streak } = data;
  const _data = {
    colour,
    diapheny,
    hardness: getRange(hmin, hmax),
    density: getRange(dmeas, dmeas2),
    tenacity,
    cleavage,
    luminescence,
    lustre,
    streak,
  };

  Object.keys(_data).forEach((key) => {
    if (_data[key]) cleanData[capitalize(MINDAT_KEYS_MAP[key] || key)] = _data[key];
  });
  if (!Object.keys(cleanData).length) return null;
  return cleanData;
};

