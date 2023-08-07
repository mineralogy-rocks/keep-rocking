import clone from 'just-clone';

import { MINDAT_DATA_NODE_STRUCTURE, MINDAT_KEYS_MAP } from "@/lib/constants";
import { capitalize, compareColors, getRange, getNumeric, concatStrings } from "@utils";



const _clearFields = (data) => {
  let cleanData = {};
  Object.keys(data).forEach((key) => {
    if (data[key]) cleanData[capitalize(MINDAT_KEYS_MAP[key] || key)] = capitalize(data[key]);
  });
  if (!Object.keys(cleanData).length) return null;
  return cleanData;
};


const parsePhysicalProperties = (data) => {
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

  let cleanData = _clearFields(_data);
  return cleanData;
};

const parseOpticalProperties = (data) => {
  if (!data) return null;
  const {
    opticaltype,
    opticalsign,
    opticalextinction,
    opticalalpha,
    opticalalpha2,
    opticalalphaerror,
    opticalbeta,
    opticalbeta2,
    opticalbetaerror,
    opticalgamma,
    opticalgamma2,
    opticalgammaerror,
    opticalomega,
    opticalomega2,
    opticalomegaerror,
    opticalepsilon,
    opticalepsilon2,
    opticalepsilonerror,
    opticaln,
    opticaln2,
    opticalnerror,
    optical2vcalc,
    optical2vcalc2,
    optical2vcalcerror,
    optical2vmeasured,
    optical2vmeasured2,
    optical2vmeasurederror,
    opticaldispersion,
    opticalpleochroism,
    opticalpleochorismdesc,
    opticalbirefringence,
    opticalcomments,
    opticalcolour,
    opticalinternal,
    opticaltropic,
    opticalanisotropism,
    opticalbireflectance,
    opticalr
  } = data;

  const _data = {
    opticalSign: concatStrings([opticaltype, opticalsign]),
    opticalbiRefringence: getNumeric(opticalbirefringence),
    optical2VMeasured: getRange(optical2vmeasured, optical2vmeasured2),
    optical2VCalculated: getRange(optical2vcalc, optical2vcalc2),
    opticalNa: getRange(opticalalpha, opticalalpha2),
    opticalNb: getRange(opticalbeta, opticalbeta2),
    opticalNg: getRange(opticalgamma, opticalgamma2),
    opticalextinction,
    opticalDispersion: opticaldispersion,
    opticalPleochroism: concatStrings([opticalpleochroism, opticalpleochorismdesc]),
  };

  let cleanData = _clearFields(_data);
  return cleanData;
};


export const getConclusiveData = (mindatData, mrData) => {
  if (!mindatData) return null;

  let conclusiveMindatData = {};
  let props = [
    {
      key: 'physicalProperties',
      callback: parsePhysicalProperties,
    },
    {
      key: 'opticalProperties',
      callback: parseOpticalProperties,
    },
  ];

  for (let prop of props) {
    conclusiveMindatData[prop.key] = clone(MINDAT_DATA_NODE_STRUCTURE);
    let _index = -1;

    mindatData.forEach((item) => {
      let _props = prop.callback(item);
      if (_props) {
        _index++;
        let _item = {
          id: item.id,
          name: item.name,
          color: compareColors[_index].base,
          statuses: null,
        };
        let _statuses = item.id === mrData.mindat_id ?
            mrData.statuses.map((status) => status.status_id) :
            mrData.inheritance_chain.find((chainItem) => chainItem.mindat_id === item.id)?.statuses;
        _item['statuses'] = _statuses;
        conclusiveMindatData[prop.key].minerals.push(_item);

        Object.entries(_props).forEach(([key, value]) => {
          if (!conclusiveMindatData[prop.key].items[key]) conclusiveMindatData[prop.key].items[key] = [];

          let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => item_.value === value);
          if (_existingItem) {
            _existingItem.ids.push(item.id);
          } else {
            conclusiveMindatData[prop.key].items[key].push({ 'value': value, 'ids': [item.id] });
          }
        });
      }
    });
  };
  return conclusiveMindatData;
};
