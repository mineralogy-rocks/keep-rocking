import { mindatDataNode } from "@/lib/types";


export const IMA_STATUS_CHOICES = {
  approved: "APPROVED",
  discredited: "DISCREDITED",
  pending: "PENDING_PUBLICATION",
  grandfathered: "GRANDFATHERED",
  questionable: "QUESTIONABLE",
};

export const STATUS_GROUPS_PLURAL = {
  2: "Synonyms",
  3: "Varieties",
  4: "Polytypes",
  5: "Obsolete terms",
  8: "Rocks",
  11: "IMA-approved minerals",
};

export const COMPLEMENTING_STATUS_GROUPS = {
  1: [1, 8],
  2: [2, 3, 4, 5, 6, 7, 9, 10],
  3: [11]
};

export const STRUCTURAL_DATA_KEYS = [
  "a",
  "b",
  "c",
  "alpha",
  "beta",
  "gamma",
  "volume",
];

export const MINDAT_RETRIEVE_FIELDS = [
  "id",
  "name",

  "colour",
  "diapheny",
  "dmeas",
  "dmeas2",
  "hmin",
  "hmax",
  "tenacity",
  "cleavage",
  "luminescence",
  "lustre",
  "streak",

  "opticaltype",
  "opticalsign",
  "opticalextinction",
  "opticalalpha",
  "opticalalpha2",
  "opticalalphaerror",
  "opticalbeta",
  "opticalbeta2",
  "opticalbetaerror",
  "opticalgamma",
  "opticalgamma2",
  "opticalgammaerror",
  "opticalomega",
  "opticalomega2",
  "opticalomegaerror",
  "opticalepsilon",
  "opticalepsilon2",
  "opticalepsilonerror",
  "opticaln",
  "opticaln2",
  "opticalnerror",
  "optical2vcalc",
  "optical2vcalc2",
  "optical2vcalcerror",
  "optical2vmeasured",
  "optical2vmeasured2",
  "optical2vmeasurederror",
  "opticaldispersion",
  "opticalpleochroism",
  "opticalpleochorismdesc",
  "opticalbirefringence",
  "opticalcomments",
  "opticalcolour",
  "opticalinternal",
  "opticaltropic",
  "opticalanisotropism",
  "opticalbireflectance",
  "opticalr",
];

export const MINDAT_KEYS_MAP = {
  density: "Measured Density",

  opticalSign: "Optical Sign",
  opticalExtinction: "Optical Extinction",
  opticalbiRefringence: "Optical Birefringence",
  optical2VMeasured: "Optical 2V Measured",
  optical2VCalculated: "Optical 2V Calculated",
  opticalNa: "Na",
  opticalNb: "Nb",
  opticalNg: "Ng",
  opticalDispersion: "Optical Dispersion",
  opticalPleochroism: "Optical Pleochroism",
};

export const MINDAT_DATA_NODE_STRUCTURE: mindatDataNode = {
    "items": {},
    "minerals": [],
};
