import clone from 'just-clone';


import { MINDAT_KEYS_MAP, MINDAT_DATA_NODE_STRUCTURE } from "@/lib/constants";
import { capitalize, getRange, compareColors } from "@utils";


export const parsePhysicalProperties = (data) => {
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
    if (_data[key]) cleanData[capitalize(MINDAT_KEYS_MAP[key] || key)] = capitalize(_data[key]);
  });
  if (!Object.keys(cleanData).length) return null;
  return cleanData;
};


export const getConclusiveMindatData = (mindatData, mrData) => {
  if (!mindatData) return null;

  let conclusiveMindatData = {
    'physicalProperties': clone(MINDAT_DATA_NODE_STRUCTURE),
  };
  mindatData.forEach((item, index) => {
    const _physicalProperties = parsePhysicalProperties(item);
    if (_physicalProperties) {
      let _item = {
        id: item.id,
        name: item.name,
        color: compareColors[index].base,
      };
      let _statuses = item.id === mrData.mindat_id ?
          mrData.statuses.map((status) => status.status_id) :
          mrData.inheritance_chain.find((chainItem) => chainItem.mindat_id === item.id)?.statuses;
      _item['statuses'] = _statuses;
      conclusiveMindatData.physicalProperties.minerals.push(_item);

      Object.entries(_physicalProperties).forEach(([key, value]) => {
        if (!conclusiveMindatData.physicalProperties.items[key]) conclusiveMindatData.physicalProperties.items[key] = [];

        let _existingItem = conclusiveMindatData.physicalProperties.items[key].find((item_) => item_.value === value);
        if (_existingItem) {
          _existingItem.ids.push(item.id);
        } else {
          conclusiveMindatData.physicalProperties.items[key].push({ 'value': value, 'ids': [item.id] });
        }
      });
    }
  });
  return conclusiveMindatData;
};

