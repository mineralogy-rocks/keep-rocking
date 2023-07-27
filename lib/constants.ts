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
]

export const MINDAT_KEYS_MAP = {
  density: "Measured Density",
};

export const MINDAT_DATA_NODE_STRUCTURE = {
    "minerals": [],
    "items": [],
};
