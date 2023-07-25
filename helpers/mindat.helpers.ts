import { MINDAT_KEYS_MAP } from "@/lib/constants";
import { capitalize, getRange, concatStrings } from "@utils";


export const getPhysicalProperties = (data) => {
  let cleanData = {};
  if (!data) return null;
  const { colour, diapheny, dmeas, dmeas2, hmin, hmax, tenacity, cleavage, cleavagetype, luminescence, lustre, streak } = data;
  const _data = {
    colour,
    diapheny,
    hardness: getRange(hmin, hmax),
    density: getRange(dmeas, dmeas2),
    tenacity,
    cleavage: concatStrings([cleavagetype, cleavage], " on "),
    luminescence,
    lustre,
    streak,
  };

  Object.keys(_data).forEach((key) => {
    if (_data[key]) cleanData[capitalize(MINDAT_KEYS_MAP[key] || key)] = _data[key];
  });
  return cleanData;
};
