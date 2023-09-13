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

export const HISTORY_DATA_MAP = {
  discovery_year: "Discovery year",
  publication_year: "Publication year",
  ima_year: "IMA year",
  approval_year: "Approval year",
};

export const DATA_CONTEXT_STRUCTURE = {
  minerals: [],
  items: {},
}

export const PHYSICAL_PROPS_TITLES = {
  // the order of keys matters, it defines the order of the properties in the output
  // comment out the keys to remove the properties from the output

  colorNote: ["Color note"],
  color: ["Color entities", "recognized using a custom trained NER model"],
  streakNote: ["Streak note"],
  streak: ["Streak entities", "recognized using a custom trained NER model"],

  lustre: ["Lustre"],
  // lustreNote: ["Lustre note"],
  fracture: ["Fracture"],
  // fractureNote: ["Fracture note"],
  transparency: ["Transparency"],
  luminescence: ["Luminescence"],
  tenacity: ["Tenacity"],
  hardness: ["Hardness"],
  density: ["Measured density"],
  densityCalculated: ["Calculated density"],
};
